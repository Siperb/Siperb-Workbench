TestApp.RunBeforeEach();

TestApp.Log("Adding buddy");
var phone = window.phone;
await phone.AddBuddy({
    Id: phone.UID(),
    DisplayName: "TestBuddy ADDED",
    DisplayNumber: "1234567890",
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

phone.UpdateBuddyList();
phone.UpdateUI();


if (window.phone.MyBuddies.length !== 1) {
    throw new Error("MyBuddies.length is " + phone.MyBuddies.length + ", expected 1");
}

TestApp.Pass("Buddy added");
return true;