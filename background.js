

chrome.webNavigation.onCommitted.addListener(function(tab) {

    if (details.frameId !== 0) return;

    try {
        const url = new URL(details.url);
        if (url.hostname.replace("/^www\./", "") === "linkedin.com") {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                files: ["linkedin.js"]
            });
        }
    } catch (err) {
        console.error("Failed to parse URL: ", err);
    }
});

