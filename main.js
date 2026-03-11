// TestApp - Helper namespace for Siperb Workbench tests
// Available in test context as: TestApp.Pass(), TestApp.Fail(), TestApp.Log(), TestApp.wait()
// RunBeforeEach() is called automatically by the runner before each test.
// Phone state cleanup (e.g. deleting buddies) is handled by beforeRun.js in each suite.

window.TestApp = {
    _result: null,
    _logs: [],

    // Called automatically by the runner before each test.
    // Only resets TestApp tracking state — phone state is handled by beforeRun.js.
    RunBeforeEach() {
        this._result = null;
        this._logs = [];
        window.__testResult = null;
        window.__testLogs = [];
    },

    Log(msg) {
        const s = String(msg);
        console.log('[TestApp]', s);
        this._logs.push(s);
        window.__testLogs = this._logs;
    },

    Update(status, message) {
        this._result = { status, message };
        window.__testResult = this._result;
        return this._result;
    },

    Pass(message) { return this.Update('pass', message); },
    Fail(message) { return this.Update('fail', message); },

    wait(ms) { return new Promise(r => setTimeout(r, ms)); }
};
