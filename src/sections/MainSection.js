'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import axios from 'axios';
import { FaRegBookmark } from "react-icons/fa";
import '../app/globals.css';

export default function MainSection() {
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        // Fetch jobs data from the API
        axios.get('http://localhost:8000/api/jobs/show')
            .then((response) => {
                console.log("API Response:", response.data);
                setJobs(response.data.jobs);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, []);

    return (
        <div className="d-flex flex-column flex-md-row">
            {/* Sidebar Section */}
            <SideBar />
            {/* Main Content Section */}
            <div className="main-content flex-grow-1 py-4 col-12 col-md-9">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <h2 className="me-2">Recommended Jobs</h2>
                            <span className="text-black border border-2 rounded-pill px-2 fw-bolder">
                                {jobs.length}
                            </span>
                        </div>
                        <a className="fw-bolder text-black border border-2 px-3 rounded-pill text-decoration-none bg-transparent custom-hide-sm" href="#">
                            Most Recent
                        </a>
                    </div>

                    {/* Card Grid */}
                    <div className="row">
                        {jobs.map((job) => (
                            <div key={job.id} className="col-12 col-md-4 col-xl-4 mb-4">
                                {/* Card */}
                                <div className="card shadow-sm border-1 h-100 rounded-4 bg-white p-1">
                                    <div className="card-body p-0">
                                        {/* First Section */}
                                        <div className="rounded-4 p-2" style={{ backgroundColor: '#ffe1cc' }}>
                                            <div className="p-1">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <span className="text-black small border border-0 rounded-pill px-2 py-1 bg-white">{job.created_at.slice(0, 10)}</span>
                                                    <FaRegBookmark className="me-1" />
                                                </div>

                                                <h6 className="fw-semibold m-0">{job.companyName}</h6>
                                                <div className="d-flex justify-content-center align-items-center mb-3">
                                                    <div className="col-8 d-flex align-items-center">
                                                        <p className="fw-bold text-truncate-2-lines mb-0">
                                                            {job.jobtitle}
                                                        </p>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <img src={job.image} alt="" className="rounded-pill" width="25" height="25" />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap gap-1">
                                                    {(job.job_types || []).map((type, index) => (
                                                        <div key={index} className="border border-dark rounded-pill text-center px-2 pb-1 d-inline-block">
                                                            <small className="d-inline-block text-center" style={{ color: '#87786e', fontWeight: '400', fontSize: '12px' }}>
                                                                {type.type}
                                                            </small>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Second Section */}
                                        <div className="p-2">
                                            <div className="d-flex justify-content-between align-items-center p-2">
                                                <div>
                                                    <p className="fw-bold mb-0">${job.minSalary}-${job.maxSalary}</p>
                                                    <span className="text-muted small"> {(job.work_locations || []).map((loc, index) => (
                                                        <div key={index} className="border border-dark rounded-pill text-center px-2 pb-1 d-inline-block">
                                                            <small className="d-inline-block text-center" style={{ color: '#87786e', fontWeight: '400', fontSize: '12px' }}>
                                                                {loc.location}
                                                            </small>
                                                        </div>
                                                    ))}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={{
                                                        pathname: '/job-seeker/job-details',
                                                        query: {
                                                            id: job.id,
                                                        },
                                                    }}
                                                    className="btn btn-sm text-white bg-black rounded-pill text-decoration-none"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
