var phone = window.phone;


for(var i = 0; i < phone.MyBuddies.length; i++){
    phone.DeleteBuddy(phone.MyBuddies[i].Id);
}

phone.MyBuddies = [];
phone.UpdateBuddyList();
phone.UpdateUI();

// Add buddy
await phone.AddBuddy({
    Id: phone.UID(),
    DisplayName: "TestBuddy ADDED",
    DisplayNumber: "1234567890",
    Sessions: [],
    MessageStreamItems: [],
    DateCreated: phone.TimeNow(),
    LastActivity: phone.TimeNow(),
});




TestApp.Log("Buddies cleared successfully");

await phone.LoadBuddies();

phone.UpdateBuddyList();
phone.UpdateUI();

TestApp.Log("Buddies loaded successfully");

if (phone.MyBuddies.length !== 1) {
    throw new Error("MyBuddies.length is " + phone.MyBuddies.length + ", expected 1");
}

var buddy = phone.MyBuddies[0];
buddy.DisplayName = "TestBuddy UPDATED";
await phone.UpdateBuddy(buddy.Id, buddy);

phone.UpdateBuddyList();
phone.UpdateUI();

TestApp.Log("Buddies updated successfully");

if (phone.MyBuddies[0].DisplayName !== "TestBuddy UPDATED") {
    throw new Error("Display name is " + phone.MyBuddies[0].DisplayName + ", expected TestBuddy UPDATED");
}

return TestApp.Pass("Buddies updated successfully with display name: " + phone.MyBuddies[0].DisplayName);