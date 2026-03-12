import http from 'http';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname, normalize } from 'path';

const PORT = 3131;
const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, '..');

// Load .env from code-agent/ or project root if not already set via --env-file
for (const envPath of [join(__dir, '.env'), join(ROOT, '.env')]) {
    if (existsSync(envPath)) {
        for (const line of readFileSync(envPath, 'utf8').split('\n')) {
            const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
            if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
        }
        break;
    }
}

const WRITING_TESTS = readFileSync(join(__dir, 'Writing_Tests.md'), 'utf8');
const TESTAPP_DOCS  = readFileSync(join(__dir, 'TestApp.md'), 'utf8');

const SYSTEM = `You are a JavaScript test writer for the Siperb Web Phone API.
Return ONLY the JavaScript code, no markdown fences, no explanation.
'phone' and 'TestApp' are available in scope.

## TestApp API
${TESTAPP_DOCS}

## Writing Tests Reference
${WRITING_TESTS}`;

const PLAYGROUND_DIR = join(ROOT, 'playground');

// ── MIME types ────────────────────────────────────────────────────────────────
const MIME = {
    '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
    '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

function serveStatic(res, filePath) {
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        res.writeHead(404); res.end('Not found'); return;
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(readFileSync(filePath));
}

// Serve playground-container.html with injected base + optional file variable
function servePlayground(res, filename) {
    let html = readFileSync(join(ROOT, 'playground-container.html'), 'utf8');
    const injects = ['<base href="../">'];
    if (filename) injects.push(`<script>window.__pgFile=${JSON.stringify(filename)};</script>`);
    html = html.replace('<head>', '<head>\n    ' + injects.join('\n    '));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

// ── HTTP server ───────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    const url = req.url.split('?')[0];

    // ── Playground HTML routes ─────────────────────────────────────────────
    if (req.method === 'GET') {
        // /playground/ or /playground → empty playground
        if (url === '/playground' || url === '/playground/') {
            servePlayground(res, null);
            return;
        }

        // /playground/:name  (no extension = load JS file by name)
        const pgMatch = url.match(/^\/playground\/([^/.]+)$/);
        if (pgMatch) {
            const name = pgMatch[1];
            const filePath = join(PLAYGROUND_DIR, name + '.js');
            if (existsSync(filePath)) {
                servePlayground(res, name);
            } else {
                // File not found — still open playground with an error comment
                servePlayground(res, name + '?notfound');
            }
            return;
        }

        // /playground/:name.js → return raw JS file
        const rawMatch = url.match(/^\/playground\/([^/?#]+\.js)$/);
        if (rawMatch) {
            serveStatic(res, join(PLAYGROUND_DIR, rawMatch[1]));
            return;
        }

        // /playground (list) — JSON list of files
        if (url === '/playground/list') {
            const files = existsSync(PLAYGROUND_DIR)
                ? readdirSync(PLAYGROUND_DIR).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''))
                : [];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(files));
            return;
        }

        // Static file fallback — serve anything from project root
        const safePath = normalize(url).replace(/^(\.\.[/\\])+/, '');
        serveStatic(res, join(ROOT, safePath));
        return;
    }

    // ── AI agent (POST /) ──────────────────────────────────────────────────
    if (req.method !== 'POST') { res.writeHead(405); res.end(); return; }

    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
        try {
            const { query, currentCode, currentDoc } = JSON.parse(body);
            const parts = [];
            if (currentDoc?.content?.trim()) {
                parts.push(`API reference (${currentDoc.name}):\n${currentDoc.content}`);
            }
            if (currentCode?.trim()) {
                parts.push(`Current code:\n\`\`\`js\n${currentCode}\n\`\`\``);
            }
            parts.push(query);
            const userMsg = parts.join('\n\n');

            const r = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: SYSTEM },
                        { role: 'user', content: userMsg }
                    ],
                    temperature: 0.2
                })
            });

            const data = await r.json();
            if (!r.ok) throw new Error(data.error?.message || 'OpenAI error ' + r.status);

            let code = data.choices[0].message.content.trim()
                .replace(/^```(?:javascript|js)?\n?/, '')
                .replace(/\n?```$/, '')
                .trim();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code }));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Agent server  → http://localhost:${PORT}`);
    console.log(`Playground    → http://localhost:${PORT}/playground/`);
    console.log(`Open file     → http://localhost:${PORT}/playground/<name>`);
});
