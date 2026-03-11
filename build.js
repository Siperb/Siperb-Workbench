// -----------------------------------------------
//  Copyright © - SIPERB LTD - All Rights Reserved
// ===============================================
// File: build.js
// Description: Fetches provisioning from the Siperb API and generates runner.html
//              with window.TestConfig embedded (URLs, credentials, provisioning data).
//              Run: node build.js

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, 'test.config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));

const env = config.environment; // e.g. "testing" or "production"
console.log(`Build: environment = ${env}`);

// Fetch provisioning data from Siperb API
const USER_ID = config.USER_ID;
const DEVICE_ID = config.DEVICE_ID;
const SESSION_ID = config.SESSION_ID;

console.log(`Build: Fetching provisioning for USER_ID=${USER_ID}, DEVICE_ID=${DEVICE_ID.substring(0, 8)}...`);

let provisioning = {};
try {
    const provUrl = `https://api.siperb.com/Users/${USER_ID}/Devices/${DEVICE_ID}/?password=yes&settings_json=yes`;
    const provResp = await fetch(provUrl, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': SESSION_ID
        }
    });
    if (provResp.ok) {
        const provData = await provResp.json();
        if (provData.Platform === 'script') {
            provisioning = provData.Settings_json || {};
            console.log(`Build: Provisioning fetched successfully`);
        } else {
            console.warn(`Build: Device platform is not 'script' — provisioning may be incomplete`);
            provisioning = provData.Settings_json || {};
        }
    } else {
        console.warn(`Build: Failed to fetch provisioning (${provResp.status}) — building with empty provisioning`);
    }
} catch(e) {
    console.warn(`Build: Error fetching provisioning: ${e.message} — building with empty provisioning`);
}

// Build TestConfig from test.config.json (all URLs from config, nothing hardcoded)
const testConfig = {
    SESSION_ID,
    USER_ID,
    DEVICE_ID,
    environment: env,
    phoneVersionTreeUrl: config[`phone-version-tree-${env}`],
    siperbVersionTreeUrl: config[`siperb-version-tree-${env}`],
    UseLocalFiles: config.UseLocalFiles || [],
    Provisioning: provisioning
};

console.log(`Build: phoneVersionTreeUrl = ${testConfig.phoneVersionTreeUrl}`);
console.log(`Build: UseLocalFiles entries = ${testConfig.UseLocalFiles.length}`);

// Generate runner.html
const runnerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siperb Workbench Runner</title>
    <script>
        // TestConfig is pre-populated at build time by build.js
        // All URLs come from test.config.json — nothing is hardcoded here
        window.TestConfig = ${JSON.stringify(testConfig, null, 8)};
    </script>
    <script type="module" src="./builder/SiperbWorkBenchBuilder.js"></script>
    <script src="./main.js"></script>
</head>
<body>
    <iframe id="phoneFrame" src="./phone.html" style="display:none; width:100%; height:100%; border:none;"></iframe>
    <script>
        window.addEventListener('load', async function() {
            const iframe = document.getElementById('phoneFrame');
            const cfg = window.TestConfig;
            try {
                console.log('Runner: Loading Browser Phone into iframe...');
                await SiperbWorkBenchBuilder.LoadBrowserPhone(iframe, {
                    treeUrl: cfg.phoneVersionTreeUrl,
                    UseLocalFiles: cfg.UseLocalFiles
                });
                console.log('Runner: Provisioning phone...');
                await SiperbWorkBenchBuilder.ProvisionPhone({
                    Provisioning: cfg.Provisioning,
                    PhoneFrame: iframe,
                    ProfileUserId: cfg.DEVICE_ID,
                    SessionId: cfg.SESSION_ID,
                    UserId: cfg.USER_ID,
                });
                console.log('Runner: Phone ready.');
                window.__phoneReady = true;
            } catch(e) {
                console.error('Runner: Phone load failed:', e);
                window.__phoneError = e.message || String(e);
            }
        });
    </script>
</body>
</html>`;

writeFileSync(resolve(__dirname, 'runner.html'), runnerHtml);
console.log(`Build: runner.html written`);
