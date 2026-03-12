// Wait for phone to be ready
var deadline = Date.now() + 10000;
while (phone.SipProvider.Status !== "Registered") {
    await TestApp.Wait(300);
    if (Date.now() > deadline) throw new Error("Timed out waiting for registration");
}

// Add a buddy
phone.AddBuddy({
    Id: phone.UID(),
    DisplayName: "John"
});

// Assert
if (phone.MyBuddies.length !== 1) {
    throw new Error("Expected 1 buddy, got " + phone.MyBuddies.length);
}

TestApp.Pass("Buddy added: " + phone.MyBuddies[0].DisplayName);
