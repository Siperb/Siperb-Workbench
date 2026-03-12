# TestApp

TestApp is the test helper available in every test. It is automatically injected alongside `phone` — no import needed.

---

## Methods

### `TestApp.Pass(message)`
Marks the test as **passing** and sets the result message. Call this at the end of a successful test.

```js
TestApp.Pass("Buddy added successfully");
```

---

### `TestApp.Fail(message)`
Marks the test as **failing** with a message. Prefer `throw new Error(msg)` for failures — the runner catches it automatically.

```js
TestApp.Fail("Expected 1 buddy, got " + phone.MyBuddies.length);
// or equivalently:
throw new Error("Expected 1 buddy, got " + phone.MyBuddies.length);
```

---

### `TestApp.Log(message)`
Logs a message to the test output panel and browser console. Use freely for progress/debug output.

```js
TestApp.Log("SIP status: " + phone.SipProvider.Status);
TestApp.Log("Session ID: " + sessionId);
```

---

### `TestApp.Wait(ms)`
Returns a Promise that resolves after `ms` milliseconds. Use with `await` to pause execution.

```js
await TestApp.Wait(1000);   // pause 1 second
await TestApp.Wait(300);    // pause 300ms
```

**Polling pattern** — wait for a condition with a timeout:
```js
var deadline = Date.now() + 10000;
while (Date.now() < deadline) {
    if (phone.SipProvider.Status === "Registered") break;
    await TestApp.Wait(300);
}
if (phone.SipProvider.Status !== "Registered") throw new Error("Timed out waiting for registration");
```

---

### `TestApp.RunBeforeEach()`
Resets internal state (result + logs). Called automatically by the runner before each test. You rarely need to call this manually.

```js
TestApp.RunBeforeEach();
```

---

## Typical test structure

```js
// 1. Wait for phone to be ready
while (phone.SipProvider.Status !== "Registered") {
    await TestApp.Wait(300);
}

// 2. Do the thing
phone.AddBuddy({ Id: phone.UID(), DisplayName: "Alice" });

// 3. Assert
if (phone.MyBuddies.length !== 1) {
    throw new Error("Expected 1 buddy, got " + phone.MyBuddies.length);
}

// 4. Pass
TestApp.Pass("Buddy added: " + phone.MyBuddies[0].DisplayName);
```

---

## Internal properties (read-only)

| Property | Type | Description |
|---|---|---|
| `_result` | `{ status, message } \| null` | Current test result, synced to `window.__testResult` |
| `_logs` | `string[]` | All logged messages, synced to `window.__testLogs` |
