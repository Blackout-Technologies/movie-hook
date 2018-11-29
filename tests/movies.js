// Test implementation
const Hook = require('nexus-hook').TestHook;
var myHook = new Hook("en-US");

myHook.addSlot("movie", "The Hulk")

// run the test hook with the test parameters
myHook.chat("Do you know The Hulk?", "tellMeAbout", [], (resp) => {
    console.log(resp.answer);
});


myHook.addSlot("movie", "Stardust")

// run the test hook with the test parameters
myHook.chat("What do you know about Stardust?", "tellMeAbout", [], (resp) => {
    console.log(resp.answer);
});
