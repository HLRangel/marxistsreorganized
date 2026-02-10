let maindomain = "marxists.architexturez.net";

function getRequest(message, sender, sendResponse) {
    if(message.text == "what") {
        console.log(message.text);

        browser.storage.local.get("redirectdomain").then(function (item) {
            console.log(item);
            maindomain = item.redirectdomain;
        },
        
        function (error) {
            console.log("no default domain!");
        });

        sendResponse({
            response: maindomain
        });
    } else {
        console.log("request without appropriate response");

        sendResponse({
            response: undefined
        });
    }
}

browser.runtime.onMessage.addListener(getRequest);