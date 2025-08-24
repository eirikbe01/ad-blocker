

chrome.webNavigation.onCommitted.addListener((details) => {

    if (details.frameId !== 0) return;

    try {
        const url = new URL(details.url);
        const hostname = url.hostname.replace(/^www\./, "")
        if (hostname === "linkedin.com") {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                files: ["linkedin.js"]
            });
        }
    } catch (err) {
        console.error("Failed to parse URL: ", err);
    }
});