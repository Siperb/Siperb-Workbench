TestApp.Log("Initializing storage tests");

var phone = window.phone;

var storage = window.localStorage.getItem("StorageInitV2");
if(storage == null) {
    return TestApp.Fail("Storage not initialized");
}
return TestApp.Pass("Storage initialized successfully with value: " + storage);