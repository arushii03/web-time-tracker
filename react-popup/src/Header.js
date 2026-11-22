/* global chrome */
function Header() {

    const resetData = () => {
        chrome.storage.local.set({ sites: {} }, () => {
            alert("Data Reset!");
            window.location.reload();
        });
    };

    return (
        <div>
            <h1>📊 Productivity Tracker</h1>
            <button onClick={resetData}>Reset Data</button>
        </div>
    );
}

export default Header;