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
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        job_types: [],
        job_levels: [],
    });

    const fetchJobs = async () => {
        try {
            // Make the API request without filters
            const response = await axios.get('http://localhost:8000/api/jobs/show');
            const fetchedJobs = response.data.jobs;
            console.log(fetchedJobs);
            setJobs(fetchedJobs); 
            setFilteredJobs(fetchedJobs);  // Set the initial job list without filters
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Filter jobs based on selected filters
    const filterJobs = () => {
        let updatedJobs = [...jobs]; // Start with all jobs

        // Filter by job types
        if (filters.job_types.length > 0) {
            updatedJobs = updatedJobs.filter(job =>
                job.job_types.some(type => filters.job_types.includes(type.type))
            );
        }

        // Filter by job levels
        if (filters.job_levels.length > 0) {
            updatedJobs = updatedJobs.filter(job =>
                job.job_levels.some(level => filters.job_levels.includes(level.level))
            );
        }

        setFilteredJobs(updatedJobs);  // Update filtered jobs
    };

    useEffect(() => {
        fetchJobs();

        // Set up Pusher to listen for new job posts
        const pusher = new Pusher('68d431386799dc1b76cd', { cluster: 'ap2' });
        const channel = pusher.subscribe('jobs');
        channel.bind('job-posted', function (data) {
            console.log('New job posted:', data.job);
            setJobs(prevJobs => [data.job, ...prevJobs]);
            filterJobs();  // Re-filter jobs after a new job is posted
        });

        // Cleanup Pusher subscription
        return () => {
            pusher.unsubscribe('jobs');
        };
    }, []);

    useEffect(() => {
        filterJobs(); // Filter jobs whenever filters change
    }, [filters]);

    const handleFilterChange = (category, value) => {
        setFilters((prevFilters) => {
            const current = prevFilters[category];
            const isChecked = current.includes(value);

            const updated = isChecked
                ? current.filter((item) => item !== value)
                : [...current, value];

            const newFilters = {
                ...prevFilters,
                [category]: updated,
            };

            console.log("Selected Filters:", newFilters);
            return newFilters;
        });
    };

    return (
        <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
            {/* Sidebar Section */}
            <SideBar filters={filters} handleFilterChange={handleFilterChange} />
            {/* Main Content Section */}
            <div className="main-content flex-grow-1 py-4 col-12 col-md-9">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <h2 className="me-2">Recommended Jobs</h2>
                            <span className="text-black border border-2 rounded-pill px-2 fw-bolder">
                                {filteredJobs.length}
                            </span>
                        </div>
                        <a className="fw-bolder text-black border border-2 px-3 rounded-pill text-decoration-none bg-transparent custom-hide-sm" href="#">
                            Most Recent
                        </a>
                    </div>

                    {/* Job Cards Grid */}
                    <div className="row">
                        {filteredJobs.length === 0 ? (
                            <p>No jobs available</p>
                        ) : (
                            filteredJobs.map((job) => (
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
