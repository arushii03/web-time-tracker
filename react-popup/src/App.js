/* global chrome */
import React, { useEffect, useState } from "react";
import SiteList from "./SiteList";
import ChartComponent from "./ChartComponent";
import Header from "./Header";

function App() {
    const [sites, setSites] = useState({});

    useEffect(() => {
        // Initial load
        chrome.storage.local.get(["sites"], (result) => {
            if (result.sites) {
                setSites(result.sites);
            }
        chrome.runtime.sendMessage({ action: "saveTime" });
        });

        // Live update every 2 sec
        const interval = setInterval(() => {
            chrome.storage.local.get(["sites"], (result) => {
                if (result.sites) {
                    setSites(result.sites);
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    function getMostUsedSite(sites) {
        let maxSite = "";
        let maxTime = 0;

        for (let site in sites) {
            if (sites[site] > maxTime) {
                maxTime = sites[site];
                maxSite = site;
            }
        }

        return maxSite;
    }


    return (
        <div>
            <Header />

            <h2>Web Time Tracker</h2>

            <p>Most Used Site: {getMostUsedSite(sites) || "No Data Yet"}</p>

            <ChartComponent sites={sites} />

            <SiteList sites={sites} />
        </div>
    );
}

export default App;