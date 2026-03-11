
var phone = window.phone;

// Ensure phone.SipProvider.Status == "Registered"
while(phone.SipProvider.Status !== "Registered"){
    await TestApp.Wait(100);
}

TestApp.Log("SipProvider.Status is " + phone.SipProvider.Status);


var sessionId = null;       // set on OnAccept
var callAccepted = false;
var callEnded = false;
var hangupCalled = false;


// phone.AddBuddy({
//     Id: phone.UID(),
//     DisplayName: "*65",
//     DisplayNumber: "*65",
//     Contacts: [{ Number: "*65", Provider: "sip" }],
//     Sessions: [],
//     MessageStreamItems: [],
//     DateCreated: phone.TimeNow(),
//     LastActivity: phone.TimeNow(),
// });

// phone.UpdateBuddyList();
// phone.UpdateUI();

// if (phone.MyBuddies.length !== 1) {
//     throw new Error("MyBuddies.length is " + phone.MyBuddies.length + ", expected 1");
// }

var buddy = phone.MyBuddies[0];

function onSessionStateChange(event) {
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



window.addEventListener("OnSessionStateChange", onSessionStateChange);

sessionId = await phone.Dial(buddy);
TestApp.Log("SessionId: " + sessionId);
TestApp.Log("Waiting for call to be accepted");

// Wait up to 30 s for the call to be accepted and then end
var callDeadline = Date.now() + 30000;
while (Date.now() < callDeadline) {
    await TestApp.Wait(300);
    if (callEnded) break;
}

window.removeEventListener("OnSessionStateChange", onSessionStateChange);

if(callEnded){
    TestApp.Log("Call ended, checking for CDR");
    phone.SelectBuddy(buddy);
    if(phone.SelectedBuddy.MessageStreamItems.length === 0){
        throw new Error("No CDR found");
    }
    var cdr = await phone.GetMessageStreamItem(phone.SelectedBuddy.MessageStreamItems[0].Id);
    if(!cdr){
        throw new Error("CDR not found");
    }
    TestApp.Log("CDR found: " + cdr.Body, cdr.Direction, cdr.Disposition);

    if(cdr.Events.some(event => event.Activity && event.Activity.includes("Cancel"))){
        TestApp.Log("Cancel event found: " + cdr.Events.find(event => event.Activity && event.Activity.includes("Cancel"))?.Activity);
    }else{
        throw new Error("Cancel event not found");
    }


    // Check Disposition is "Canceled"
    if(cdr.Disposition !== "Cancelled"){
        throw new Error("Disposition is not Canceled");
    }

    // Check that TerminatedBy is "us"
    if(cdr.TerminatedBy !== "us" && cdr.TerminatedBy !== "Us"){
        throw new Error("TermindatedBy is not us, it is " + cdr.TerminatedBy);
    }
    TestApp.Pass("Early Cancel OK: " + cdr.Body + " " + cdr.Direction + " " + cdr.Disposition + " " + cdr.TerminatedBy);
    return;
} else {
    throw new Error("Call did not end after EndCall (no Hangup/Ended event)");
    TestApp.Log("Call did not end after EndCall (no Hangup/Ended event)");
}   