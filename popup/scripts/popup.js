function refreshSelectedOption() {
    let element = document.getElementById("mirrors");
    
    if(element != null) {
        let data = element.value;

        browser.storage.local.set({
            redirectdomain: data
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document
        .getElementById("apply-button")
        .addEventListener("click", refreshSelectedOption, false);
}, false)


refreshSelectedOption();

/*browser.runtime.sendMessage(
    {
        text: "redirectdomain"
    }
);*/