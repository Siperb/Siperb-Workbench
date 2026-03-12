// -----------------------------------------------
//  Copyright © - SIPERB LTD - All Rights Reserved
// ===============================================
// File: serve.js
// Description: Starts a local HTTP server and opens test-bench.html in the browser.
//              Avoids file:// CORS restrictions on ES modules.
//
// Usage: node serve.js

import http from 'http';
import { readFileSync, statSync, existsSync } from 'fs';
import { resolve, join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const MIME = {
    '.html': 'text/html', '.js': 'application/javascript',
    '.css': 'text/css', '.json': 'application/json',
    '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Build local-files map from test.config.json UseLocalFiles entries
const localFilesMap = {};
try {
    const cfg = JSON.parse(readFileSync(resolve(__dirname, 'test.config.json'), 'utf8'));
    if (Array.isArray(cfg.UseLocalFiles)) {
        for (const f of cfg.UseLocalFiles) {
            const fp = f.absolutePath || (f.relativePath && resolve(__dirname, f.relativePath)) || (f.file && resolve(__dirname, f.file));
            if (f.lib && fp) localFilesMap[f.lib] = fp;
        }
    }
} catch(_) {}

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

    // /playground/ or /playground → empty playground
    if (urlPath === '/playground' || urlPath === '/playground/') {
        let html = readFileSync(join(__dirname, 'playground-container.html'), 'utf8');
        html = html.replace('<head>', '<head>\n<base href="../">');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    }

    // /playground/:name  (no extension) → serve playground with base + __pgFile injected
    const pgMatch = urlPath.match(/^\/playground\/([^/.]+)$/);
    if (pgMatch) {
        let html = readFileSync(join(__dirname, 'playground-container.html'), 'utf8');
        html = html.replace('<head>', '<head>\n<base href="../">\n<script>window.__pgFile=' + JSON.stringify(pgMatch[1]) + ';</script>');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    }

    const filePath = join(__dirname, urlPath === '/' ? 'test-bench.html' : urlPath);
    try {
        const stat = statSync(filePath);
        if (stat.isFile()) {
            const mime = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': mime });
            res.end(readFileSync(filePath));
            return;
        }
        if (stat.isDirectory()) {
            const indexPath = join(filePath, 'index.html');
            if (existsSync(indexPath)) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(readFileSync(indexPath));
                return;
            }
        }
    } catch (_) {}
    res.writeHead(404); res.end('Not found');
});

server.listen(0, '127.0.0.1', () => {
    const port = server.address().port;
    const url = `http://127.0.0.1:${port}/test-bench.html`;
    console.log(`Test bench → ${url}`);
    console.log(`Playground → http://127.0.0.1:${port}/playground/`);
    console.log('Press Ctrl+C to stop.');
    exec(`open "${url}"`);
});
