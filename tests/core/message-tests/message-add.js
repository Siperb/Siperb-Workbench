TestApp.Log("Starting Message add test");


TestApp.RunBeforeEach();

// Add a buddy
phone.AddBuddy({
    Id: phone.UID(),
    DisplayName: "TestBuddy ADDED",
    Sessions: [],
    MessageStreamItems: [],
    DateCreated: phone.TimeNow(),
    LastActivity: phone.TimeNow(),
    Description: "TestBuddy",
    EnableDuringDnd: false,
    Avatar: phone.RandomAvatar(),
    Missed: 0,
    AutoDelete: false,
    Contacts: [{ Number: "1234567890", Provider: "sip" }],
});

var buddy = phone.MyBuddies[0];
if (!buddy) {
    throw new Error("No buddy found");
}
var message = {
    Type: "MSG",
    Id: phone.UID(),
    BuddyId: buddy.Id,
    DateCreated: phone.TimeNow(),
    Body: "Hello, world!",
    Direction: "outbound",
}

await phone.AddMessage(buddy, message);

if(buddy.MessageStreamItems.length !== 1) {
    throw new Error("MessageStreamItems.length is " + buddy.MessageStreamItems.length + ", expected 1");
}

return TestApp.Pass("Message added");