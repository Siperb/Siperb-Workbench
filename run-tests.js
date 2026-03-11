// -----------------------------------------------
//  Copyright © - SIPERB LTD - All Rights Reserved
// ===============================================
// File: run-tests.js
// Description: Playwright-based headless test runner for Siperb Workbench.
//
// Usage:
//   node run-tests.js                          Run all tests in tests/
//   node run-tests.js tests/suite              Run all tests in folder (recursive)
//   node run-tests.js tests/suite/test.js      Run a single test file

import { chromium } from 'playwright';
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'fs';
import { resolve, basename, dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Terminal colors ──────────────────────────────────────────────────────────

const c = {
    reset:  '\x1b[0m',
    bold:   '\x1b[1m',
    dim:    '\x1b[2m',
    green:  '\x1b[32m',
    red:    '\x1b[31m',
    yellow: '\x1b[33m',
    cyan:   '\x1b[36m',
    white:  '\x1b[37m',
    gray:   '\x1b[90m',
};

// ── CLI argument parsing ────────────────────────────────────────────────────
//
// Usage:
//   node run-tests.js                          Run all tests in tests/
//   node run-tests.js tests/suite              Run folder (recursive)
//   node run-tests.js tests/suite/test.js      Run single file
//   node run-tests.js --file=...               Explicit file flag
//   node run-tests.js --folder=...             Explicit folder flag

function parseArgs() {
    const args = process.argv.slice(2);
    const result = { file: null, folder: null };
    for (const arg of args) {
        if (arg.startsWith('--file=')) {
            result.file = arg.slice(7);
        } else if (arg.startsWith('--folder=')) {
            result.folder = arg.slice(9);
        } else if (!arg.startsWith('--')) {
            // Positional argument: auto-detect file vs folder
            const p = resolve(__dirname, arg);
            try {
                const st = statSync(p);
                if (st.isDirectory()) result.folder = p;
                else result.file = p;
            } catch (_) {
                console.error(`Path not found: ${arg}`);
                process.exit(1);
            }
        }
    }
    return result;
}

// ── Test file discovery ─────────────────────────────────────────────────────

function collectTestFiles(targetDir) {
    const files = [];
    const entries = readdirSync(targetDir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            files.push(...collectTestFiles(join(targetDir, entry.name)));
        } else if (entry.isFile() && entry.name.endsWith('.js') && entry.name !== 'beforeRun.js') {
            files.push(join(targetDir, entry.name));
        }
    }
    return files;
}

function getBeforeRunCode(suiteDir) {
    const p = join(suiteDir, 'beforeRun.js');
    return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

// ── Results writing ─────────────────────────────────────────────────────────

function writeResults(suiteResultsMap) {
    const resultsDir = resolve(__dirname, 'results');
    if (!existsSync(resultsDir)) mkdirSync(resultsDir, { recursive: true });

    const timestamp = new Date().toISOString();
    let totalPassed = 0;
    let totalFailed = 0;
    let totalTests = 0;
    const rootResults = [];

    for (const [suiteName, tests] of Object.entries(suiteResultsMap)) {
        const passed = tests.filter(t => t.status === 'pass').length;
        const failed = tests.filter(t => t.status === 'fail').length;
        const total = tests.length;

        totalPassed += passed;
        totalFailed += failed;
        totalTests += total;

        const suiteResult = {
            timestamp,
            passed,
            failed,
            total,
            results: tests
        };

        const suiteDir = join(resultsDir, suiteName);
        if (!existsSync(suiteDir)) mkdirSync(suiteDir, { recursive: true });
        writeFileSync(join(suiteDir, 'results.json'), JSON.stringify(suiteResult, null, 4));
        const suiteColor = failed === 0 ? c.green : c.red;
        console.log(`${suiteColor}${passed}/${total} passed${c.reset}  ${c.dim}→ ${suiteName}${c.reset}`);

        rootResults.push({
            name: suiteName,
            status: failed === 0 ? 'pass' : 'fail',
            total,
            passed,
            failed,
            message: `${passed} of ${total} tests passed`,
            results: tests
        });
    }

    const rootResult = {
        timestamp,
        total: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        results: rootResults
    };
    writeFileSync(join(resultsDir, 'results.json'), JSON.stringify(rootResult, null, 4));
    const allPassed = totalFailed === 0;
    const totalColor = allPassed ? c.green : c.red;
    console.log(`\n${'═'.repeat(40)}`);
    console.log(`${c.bold}${totalColor}${totalPassed}/${totalTests} passed${c.reset}${c.bold}  (${totalFailed} failed)${c.reset}`);
    console.log(`${'═'.repeat(40)}\n`);
}

// ── Local HTTP server (avoids file:// CORS restrictions on ES modules) ──────

const MIME = {
    '.html': 'text/html', '.js': 'application/javascript',
    '.css': 'text/css', '.json': 'application/json',
    '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Build local-files map from test.config.json UseLocalFiles entries
function buildLocalFilesMap(configPath) {
    try {
        const cfg = JSON.parse(readFileSync(configPath, 'utf8'));
        const map = {};
        if (Array.isArray(cfg.UseLocalFiles)) {
            for (const f of cfg.UseLocalFiles) {
                const filePath = f.absolutePath || (f.relativePath && resolve(dirname(configPath), f.relativePath)) || (f.file && resolve(dirname(configPath), f.file));
                if (f.lib && filePath) map[f.lib] = filePath;
            }
        }
        return map;
    } catch(_) { return {}; }
}

function startServer(root) {
    const localFilesMap = buildLocalFilesMap(resolve(root, 'test.config.json'));
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            const urlPath = req.url.split('?')[0];

            // Serve local file overrides at /local-files/{lib}
            const localMatch = urlPath.match(/^\/local-files\/(.+)$/);
            if (localMatch) {
                const lib = decodeURIComponent(localMatch[1]);
                const localPath = localFilesMap[lib];
                if (localPath && existsSync(localPath)) {
                    const mime = MIME[extname(localPath).toLowerCase()] || 'application/octet-stream';
                    res.writeHead(200, { 'Content-Type': mime });
                    res.end(readFileSync(localPath));
                    return;
                }
                res.writeHead(404); res.end('Local file not found: ' + lib);
                return;
            }

            const filePath = join(root, urlPath === '/' ? 'runner.html' : urlPath);
            try {
                const stat = statSync(filePath);
                if (stat.isFile()) {
                    const mime = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
                    res.writeHead(200, { 'Content-Type': mime });
                    res.end(readFileSync(filePath));
                    return;
                }
            } catch(_) {}
            res.writeHead(404); res.end('Not found');
        });
        server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
    });
}

// ── Main ────────────────────────────────────────────────────────────────────

const args = parseArgs();
const testsRoot = resolve(__dirname, 'tests');
const runnerHtmlPath = resolve(__dirname, 'runner.html');

if (!existsSync(runnerHtmlPath)) {
    console.error('Error: runner.html not found. Run "node build.js" first.');
    process.exit(1);
}

// Collect test files
let testFiles = [];
if (args.file) {
    const f = resolve(__dirname, args.file);
    if (!existsSync(f)) { console.error(`File not found: ${f}`); process.exit(1); }
    testFiles = [f];
} else if (args.folder) {
    const d = resolve(__dirname, args.folder);
    if (!existsSync(d)) { console.error(`Folder not found: ${d}`); process.exit(1); }
    testFiles = collectTestFiles(d);
} else {
    testFiles = collectTestFiles(testsRoot);
}

if (testFiles.length === 0) {
    console.log('No test files found.');
    process.exit(0);
}

console.log(`${c.bold}Running ${testFiles.length} test(s)...${c.reset}`);

// Start local HTTP server to avoid file:// CORS restrictions on ES modules
const { server, port } = await startServer(__dirname);
const runnerUrl = `http://127.0.0.1:${port}/runner.html`;
console.log(`${c.gray}Server: http://127.0.0.1:${port}${c.reset}`);

// Launch Playwright
const browser = await chromium.launch({
    headless: true,
    args: [
        '--use-fake-ui-for-media-stream',   // auto-accept getUserMedia prompts
        '--use-fake-device-for-media-stream', // provide a fake audio device so WebRTC works
        '--disable-web-security',
    ]
});
const context = await browser.newContext({ permissions: ['microphone'] });
const page = await context.newPage();

// Forward TestApp.Log to terminal; suppress all other browser console noise
page.on('console', msg => {
    const text = msg.text();
    if (text.startsWith('[TestApp]')) {
        console.log(`${c.gray}    ${text}${c.reset}`);
    }
});
page.on('pageerror', err => process.stderr.write(`${c.red}[browser error] ${err.message.split('\n')[0]}${c.reset}\n`));

await page.goto(runnerUrl);

// Wait for phone to be provisioned and ready
console.log(`${c.gray}Waiting for phone to be ready...${c.reset}`);
try {
    await page.waitForFunction(() => window.__phoneReady === true || window.__phoneError !== undefined, {
        timeout: 30000
    });
} catch(e) {
    console.error('Timeout: Phone did not become ready within 30 seconds.');
    await browser.close();
    process.exit(1);
}

const phoneError = await page.evaluate(() => window.__phoneError);
if (phoneError) {
    console.error(`Phone failed to load: ${phoneError}`);
    await browser.close();
    process.exit(1);
}
console.log(`${c.green}Phone ready.${c.reset}`);

// Group test files by suite (parent directory name)
const suiteResultsMap = {};
let currentSuite = null;

// Pre-compute suite sizes for the header
const suiteFileCounts = {};
for (const f of testFiles) {
    const s = basename(dirname(f));
    suiteFileCounts[s] = (suiteFileCounts[s] || 0) + 1;
}

for (const testFile of testFiles) {
    const suiteDir = dirname(testFile);
    const suiteName = basename(suiteDir);
    const testName = basename(testFile, '.js');
    const testCode = readFileSync(testFile, 'utf8');
    const beforeRunCode = getBeforeRunCode(suiteDir);

    // Print suite header when entering a new suite
    if (suiteName !== currentSuite) {
        currentSuite = suiteName;
        const count = suiteFileCounts[suiteName];
        const bar = '═'.repeat(40);
        console.log(`\n${c.cyan}${bar}${c.reset}`);
        console.log(`${c.bold}${c.cyan}  ${suiteName}${c.reset}${c.gray}  (${count} test${count !== 1 ? 's' : ''})${c.reset}`);
        console.log(`${c.cyan}${bar}${c.reset}`);
    }

    const result = await page.evaluate(async ([testCode, beforeRunCode, testName]) => {
        const iframe = document.getElementById('phoneFrame');
        if (!iframe || !iframe.contentWindow) {
            return { status: 'fail', message: 'Phone iframe not found' };
        }
        const iw = iframe.contentWindow;

        // 1. Reset TestApp state
        window.TestApp.RunBeforeEach();
        iw.TestApp = window.TestApp;

        // 2. Run beforeRun.js if present (cleans phone state)
        if (beforeRunCode) {
            try {
                const beforeFn = new iw.Function('phone', 'TestApp',
                    `return (async () => { ${beforeRunCode} })()`
                );
                await beforeFn(iw.phone, iw.TestApp);
            } catch(e) {
                return { status: 'fail', message: `beforeRun failed: ${e.message}` };
            }
        }

        // 3. Reset result so beforeRun's TestApp.Pass doesn't bleed into test result
        iw.__testResult = null;
        window.__testResult = null;
        window.TestApp._result = null;

        // 4. Run the test
        try {
            const fn = new iw.Function('phone', 'TestApp',
                `return (async () => { ${testCode} })()`
            );
            await fn(iw.phone, iw.TestApp);
            return iw.__testResult || window.__testResult || { status: 'pass', message: 'ok' };
        } catch(e) {
            return { status: 'fail', message: e.message };
        }
    }, [testCode, beforeRunCode, testName]);

    const pass = result.status === 'pass';
    const statusIcon = pass ? `${c.green}✓${c.reset}` : `${c.red}✗${c.reset}`;
    const msgColor = pass ? c.gray : c.red;
    console.log(`  ${statusIcon} ${c.white}${testName}${c.reset}  ${msgColor}${result.message}${c.reset}`);

    if (!suiteResultsMap[suiteName]) suiteResultsMap[suiteName] = [];
    suiteResultsMap[suiteName].push({ name: testName, status: result.status, message: result.message });
}

await browser.close();
server.close();
writeResults(suiteResultsMap);
