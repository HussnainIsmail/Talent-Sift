'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import axios from 'axios';
import { FaRegBookmark } from "react-icons/fa";
import Pusher from 'pusher-js';
import '../../../app/globals.css';

export default function MainSection() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch initial jobs when the component mounts
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/jobs/show');
                console.log("API Response:", response.data);
                setJobs(response.data.jobs); // Update state with fetched jobs
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs(); 
    
        // Set up Pusher to listen for job posts
        const pusher = new Pusher('68d431386799dc1b76cd', {
            cluster: 'ap2',
        });

        const channel = pusher.subscribe('jobs');
        
        // Listen for the 'job-posted' event
        channel.bind('job-posted', function(data) {
            // Here, `data` contains the new job information
            console.log('New job posted:', data.job);
            setJobs(prevJobs => [data.job, ...prevJobs]);  // Prepend the new job to the jobs list
        });

        // Cleanup the Pusher subscription on component unmount
        return () => {
            pusher.unsubscribe('jobs');
        };
    }, []);  // Empty dependency array ensures this runs only once on mount

    return (
        <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
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

                    {/* Job Cards Grid */}
                    <div className="row">
                        {jobs.length === 0 ? (
                            <p>No jobs available</p> // Show a message if no jobs are available
                        ) : (
                            jobs.map((job) => (
                                <div key={job.id} className="col-12 col-md-4 col-xl-4 mb-4">
                                    {/* Job Card */}
                                    <div className="card shadow-sm border-0 h-100 rounded-4 bg-white p-3">
                                        {/* Card Header */}
                                        <div className="rounded-4 p-3" style={{ backgroundColor: '#F1F3F5' }}>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-muted small">{job.created_at.slice(0, 10)}</span>
                                                <FaRegBookmark className="text-muted" />
                                            </div>
                                            <h6 className="fw-bold text-primary mb-1">{job.companyName}</h6>
                                            <h5 className="fw-semibold text-black text-truncate mb-2">{job.jobtitle}</h5>
                                            <div className="d-flex flex-wrap gap-1">
                                                {(job.job_types || []).map((type, index) => (
                                                    <span key={index} className="badge rounded-pill bg-secondary text-white">
                                                        {type.type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Card Content */}
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div>
                                                    <p className="fw-normal text-dark mb-0" style={{ fontSize: '14px' }}>
                                                        ${job.minSalary}-${job.maxSalary}
                                                    </p>
                                                    <small className="text-muted">
                                                        {(job.work_locations || []).map((loc, index) => (
                                                            <span key={index} className="badge rounded-pill bg-light text-dark border me-1">
                                                                {loc.location}
                                                            </span>
                                                        ))}
                                                    </small>
                                                </div>
                                                <Link
                                                    href={{
                                                        pathname: '/users/job-details',
                                                        query: { id: job.id },
                                                    }}
                                                    className="btn btn-sm text-white bg-primary rounded-pill text-decoration-none px-3"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
