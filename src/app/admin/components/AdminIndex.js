import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function AdminIndex() {
    useEffect(() => {
        let jobsChart1 = null;
        let jobsChart2 = null;

        const ctx1 = document.getElementById("jobsChart1").getContext("2d");
        const ctx2 = document.getElementById("jobsChart2").getContext("2d");

        // Create charts
        jobsChart1 = new Chart(ctx1, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Jobs",
                        data: [50, 70, 60, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                    },
                    {
                        label: "Posts",
                        data: [30, 50, 40, 60, 70, 80, 85, 95, 100, 110, 120, 125],
                        borderColor: "rgba(54, 162, 235, 1)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        });

        jobsChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Jobs",
                        data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        });

        // Cleanup function to destroy charts
        return () => {
            if (jobsChart1) jobsChart1.destroy();
            if (jobsChart2) jobsChart2.destroy();
        };
    }, []);

    return (
        <div>
            <div className="row mt-4 px-3 bg-light">
                <div className="col-md-8">
                    {/* Charts */}
                    <div className="card shadow-sm border">
                        <div className="card-body">
                            <h5>Jobs Overview 1</h5>
                            <canvas id="jobsChart1"></canvas>
                        </div>
                    </div>
                    <div className="card mt-4 shadow-sm border">
                        <div className="card-body">
                            <h5>Jobs Overview 2</h5>
                            <canvas id="jobsChart2"></canvas>
                        </div>
                    </div>
                </div>

                {/* Info Cards on the right */}
                <div className="col-md-4">
                    <div className="card shadow-sm border mb-4">
                        <div className="card-body">
                            <h6>Total Projects</h6>
                            <h2>10,724</h2>
                        </div>
                    </div>
                    <div className="card shadow-sm border mb-4">
                        <div className="card-body">
                            <h6>Completed Projects</h6>
                            <h2>9,801</h2>
                            <p className="text-success">+12% Completion Rate</p>
                        </div>
                    </div>
                    <div className="card shadow-sm border mb-4">
                        <div className="card-body">
                            <h6>Running Projects</h6>
                            <h2>923</h2>
                            <p className="text-primary">+8% Increase</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
