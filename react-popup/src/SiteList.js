import { useEffect, useState } from "react";

function SiteList({ sites }) {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes} min ${sec} sec`;
    }

    return (
        <div>
            {Object.keys(sites).map((site) => {
                let time = sites[site];

                // OPTIONAL: simulate live update for current tab (basic version)
                return (
                    <div key={site}>
                        {site} : {formatTime(time)}
                    </div>
                );
            })}
        </div>
    );
}

export default SiteList;