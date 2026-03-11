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

return TestApp.Pass("Buddies loaded successfully with " + phone.MyBuddies.length + " buddies");
