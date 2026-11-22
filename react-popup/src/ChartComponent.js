import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent({ sites }) {

    const data = {
        labels: Object.keys(sites),
        datasets: [
            {
                label: "Time Spent (seconds)",
                data: Object.values(sites),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40"
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{ width: "300px", margin: "0 auto" }}>
            <Pie data={data} />
        </div>
    );
}

export default ChartComponent;