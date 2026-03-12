# Writing Tests for Phone

# Example
"I want to add a buddy"
=> phone.AddBuddy({
    Id: phone.UID(),
    DisplayName: "John"
})


# use PhoneAPI functions
- Favour PhoneAPI functions
    eg. dont use phone.OnBuddyAdded , use phone.AddBuddy

# Calling 
- When trying to perform certain actions like hold, or mute etc. Its useful to add a OnSessionChanged listener
e.g function onSessionStateChange(event) {
    var data = event.detail && event.detail.Data;
    if (!data) return;
    var sid = data.SessionId;
    var state = data.State;
    var session = (phone.GetSessionById && phone.GetSessionById(sid)) ||
                  (phone.GetSession    && phone.GetSession(sid));
    if (!session || (session.BuddyId !== buddy.Id && sid !== sessionId)) return;
    TestApp.Log("OnSessionStateChange: " + state + " (SessionId=" + sid + ")");
   if(state === "OnProgress"){
    TestApp.Log("Call in progress, calling Cancel");
    phone.EndCall(sid);
   
   }

   if(state === "Hangup" || state === "Ended" || state === "Cancel"){
    callEnded = true;
    TestApp.Log("Call ended: " + state);
    
   }
}

Ensure to remove the listener afterwards

Call Flows = OnTrying -> OnProgress(Ringing)-> OnAccept(Established)



window.addEventListener("OnSessionStateChange", onSessionStateChange);

# Transfers 
- Keep in mind transfer needs 2 or more buddies to work.

