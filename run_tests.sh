#!/bin/bash

# --ui: serve test-bench.html via HTTP (required for ES module CORS)
if [[ "$*" == *"--ui"* ]]; then
    node serve.js
    exit 0
fi

node run-tests.js "$@"
