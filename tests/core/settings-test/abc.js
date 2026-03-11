TestApp.Log("Starting Settings Test");


var settings = window.phone.Settings;

TestApp.Log("Settings", settings);

if (settings.HelloWorld !== "Hello World") {
    throw new Error("HelloWorld is " + settings.HelloWorld + ", expected Hello World");
}

return TestApp.Pass("Settings Test");