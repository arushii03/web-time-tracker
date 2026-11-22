let activeTab = null;
let startTime = null;
let isIdle = false;

chrome.idle.setDetectionInterval(30); // seconds

// Function to save time
function saveTime() {
    if (!activeTab || !startTime) return;

    const currentTime = Date.now();
    const timeSpent = Math.floor((currentTime - startTime) / 1000);

    if (timeSpent <= 0) return; // 🔥 prevent useless saves

    chrome.storage.local.get(["sites"], (result) => {
        let sites = result.sites || {};

        if (!sites[activeTab]) {
            sites[activeTab] = 0;
        }

        sites[activeTab] += timeSpent;

        chrome.storage.local.set({ sites });
    });

    startTime = currentTime;
}

// Track tab switch
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    if (!tab.url || !tab.url.startsWith("http")) {
        activeTab = null;
        startTime = null;
        return;
    }

    saveTime(); // ✅ AFTER validation

    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
});

// Track URL change in same tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {

        if (!tab.url || !tab.url.startsWith("http")) {
            activeTab = null;
            startTime = null;
            return;
        }

        saveTime();

        activeTab = new URL(tab.url).hostname;
        startTime = Date.now();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "saveTime") {
        saveTime();
    }
});

chrome.idle.onStateChanged.addListener((newState) => {
    if (newState === "idle" || newState === "locked") {
        isIdle = true;

        // stop tracking
        saveTime();
        startTime = null;
    } else if (newState === "active") {
        isIdle = false;

        if (activeTab) {
            startTime = Date.now();
    }
    }
});