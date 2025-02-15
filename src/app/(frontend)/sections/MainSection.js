'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import SideBar from './SideBar';
import { FaRegBookmark } from 'react-icons/fa';
import Pusher from 'pusher-js';
import { useRouter } from 'next/navigation'; 
import '../../../app/globals.css';

export default function MainSection() {
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState([]);  // Initialize filters

    useEffect(() => {
        // Effect to fetch jobs based on filters from query params
        if (router.query?.filters) {
            const filtersArray = router.query.filters.split(',');  
            setFilters(filtersArray);
        }
    }, [router.query?.filters]);

    useEffect(() => {
        // Function to fetch jobs from the API
        const fetchJobs = async () => {
            try {
                const filterQuery = filters.join(',');  // Join filters into a query string
                const response = await axios.get(`http://localhost:8000/api/jobs/show?filters=${filterQuery}`);
                console.log("API Response:", response.data);
                let fetchedJobs = response.data.jobs;

                // Sort jobs based on filters (if needed)
                if (filters.length > 0) {
                    fetchedJobs = fetchedJobs.sort((a, b) => {
                        const aHasProjectWork = a.job_types.some(type => type.type === 'projectWork');
                        const bHasProjectWork = b.job_types.some(type => type.type === 'projectWork');
                        if (filters.includes('projectWork')) {
                            if (aHasProjectWork && !bHasProjectWork) return -1;
                            if (!aHasProjectWork && bHasProjectWork) return 1;
                        }
                        return 0;
                    });
                }

                setJobs(fetchedJobs);  // Update state with fetched jobs
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();  // Fetch jobs whenever filters change

        // Set up Pusher to listen for new job posts
        const pusher = new Pusher('68d431386799dc1b76cd', { cluster: 'ap2' });
        const channel = pusher.subscribe('jobs');
        channel.bind('job-posted', function(data) {
            console.log('New job posted:', data.job);
            setJobs(prevJobs => [data.job, ...prevJobs]);  // Add new job to the list
        });

        // Cleanup Pusher subscription
        return () => {
            pusher.unsubscribe('jobs');
        };
    }, [filters]);

    // Handle checkbox change and update filters
    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        setFilters((prevFilters) => {
            const newFilters = checked ? [...prevFilters, value] : prevFilters.filter(filter => filter !== value);
            // Update the URL query parameters when filters change
            router.push({
                pathname: router.pathname,
                query: { filters: newFilters.join(',') },
            }, undefined, { shallow: true });
            return newFilters;
        });
    };

    return (
        <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
            {/* Sidebar Section */}
            <div className="sidebar bg-light p-4 col-12 col-md-3 custom-hide-sm">
            <div className='d-flex justify-content-between'>
                <p className='fw-bold'>Job Type</p>
            </div>
            <div>
                <form>
                    <div className='ps-2'>
                        {/* Job Type Filters */}
                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="full-time"
                                value="full-time"
                                checked={filters.includes("full-time")}
                                onChange={handleFilterChange}
                            />
                            <label className="form-check-label" htmlFor="fullTime">
                                Full-Time
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="partTime"
                                value="part-time"
                                checked={filters.includes("part-time")}
                                onChange={handleFilterChange}
                            />
                            <label className="form-check-label" htmlFor="partTime">
                                Part-Time
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="internship"
                                value="internship"
                                checked={filters.includes("internship")}
                                onChange={handleFilterChange}
                            />
                            <label className="form-check-label" htmlFor="internship">
                                Internship
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="projectWork"
                                value="projectWork"
                                checked={filters.includes("projectWork")}
                                onChange={handleFilterChange}
                            />
                            <label className="form-check-label" htmlFor="projectWork">
                                Project Work
                            </label>
                        </div>

                        {/* Job Level Filters */}
                        <div className="mt-4">
                            <p className='fw-bold'>Job Level</p>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="entryLevel"
                                    value="entry-level"
                                    checked={filters.includes("entry-level")}
                                    onChange={handleFilterChange}
                                />
                                <label className="form-check-label" htmlFor="entryLevel">
                                    Entry
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="midLevel"
                                    value="mid-level"
                                    checked={filters.includes("mid-level")}
                                    onChange={handleFilterChange}
                                />
                                <label className="form-check-label" htmlFor="midLevel">
                                    Mid
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="expertLevel"
                                    value="expert-level"
                                    checked={filters.includes("expert-level")}
                                    onChange={handleFilterChange}
                                />
                                <label className="form-check-label" htmlFor="expertLevel">
                                    Expert
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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
                            <p>No jobs available</p>
                        ) : (
                            jobs.map((job) => (
                                <div key={job.id} className="col-12 col-md-4 col-xl-4 mb-4">
                                    <div className="card shadow-sm border-0 h-100 rounded-4 bg-white p-3">
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
                                                        pathname: '/job-details',
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
