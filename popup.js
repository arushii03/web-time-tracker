console.log("Popup loaded");

chrome.storage.local.get(["sites"], (result) => {
    const root = document.getElementById("root");
    root.innerHTML = "<h2>Web Time Tracker</h2>";
    const sites = result.sites || {};
    Object.keys(sites).forEach(site => {
        const div = document.createElement("div");
        div.textContent = `${site} : ${sites[site]} seconds`;
        root.appendChild(div);
    });
});