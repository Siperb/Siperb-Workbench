// Create a new buddy *65
var phone = window.phone;
// Clear all buddies
for(var buddy of phone.MyBuddies){
    phone.DeleteBuddy(buddy.Id);
}
phone.UpdateBuddyList();
phone.UpdateUI();

// Add buddy *65
await phone.AddBuddy({
    Id: phone.UID(),
    DisplayName: "*65",
    DisplayNumber: "*65",
    Contacts: [{ Number: "*65", Provider: "sip" }],
    Sessions: [],
    MessageStreamItems: [],
    DateCreated: phone.TimeNow(),
    LastActivity: phone.TimeNow(),
});

phone.UpdateBuddyList();
phone.UpdateUI();

TestApp.Log("Buddy *65 created");
return;