TestApp.Log("Deleting all buddies");
for(var i = 0; i < phone.MyBuddies.length; i++){
    phone.DeleteBuddy(phone.MyBuddies[i].Id);
}

phone.MyBuddies = [];
phone.UpdateBuddyList();
phone.UpdateUI();

if (phone.MyBuddies.length !== 0) {
    throw new Error("MyBuddies.length is " + phone.MyBuddies.length + ", expected 0");
}


return;