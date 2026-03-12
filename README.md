npm install
node build
node run-tests.js './tests/core'
./run-tests.sh --ui
node code-agent/agent.js
node serve