'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import NavBar from '@/sections/NavBar';
import axios from 'axios';
import { FaRegBookmark } from "react-icons/fa";
import Link from 'next/link';

export default function Page() {
    const [jobs, setJobs] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs/show')
            .then((response) => {
                const fetchedJobs = response.data.jobs;
                setJobs(fetchedJobs);

                if (!id && fetchedJobs.length > 0) {
                    const firstJobId = fetchedJobs[0].id;
                    router.push(`?id=${firstJobId}`);
                    setSelectedJob(fetchedJobs[0]);
                } else {
                    const selected = fetchedJobs.find(job => job.id === parseInt(id));
                    setSelectedJob(selected || fetchedJobs[0]);
                }
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, [id, router]);

    const sortedJobs = jobs.filter(job => job.id === parseInt(id))
        .concat(jobs.filter(job => job.id !== parseInt(id)));

    useEffect(() => {
        if (id) {
            const selected = jobs.find(job => job.id === parseInt(id));
            setSelectedJob(selected);
        }
    }, [id, jobs]);

    return (
        <div>
            <NavBar />
            <div className="container-fluid px-4">
                <div className="row pt-3">
                    {/* Sidebar with Jobs List */}
                    <div className="col-md-3 d-none d-sm-block">
                        {sortedJobs.map(job => (
                            <div key={job.id} className="col-12 mb-4">
                                <div className="card shadow-sm border-1 h-100 rounded-4 bg-white p-1">
                                    <div className="card-body p-0">
                                        <div className="rounded-4 p-3" style={{ backgroundColor: '#F1F3F5', minHeight: '150px' }}>
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
                                                        pathname: '/users/job-details',
                                                        query: { id: job.id, company_id: job.company.id },
                                                    }}
                                                    className="btn btn-sm text-white bg-primary rounded-pill text-decoration-none px-3"
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

                    {/* Main Content Area */}
                    <div className="col-md-6 col-sm-12 bg-white rounded-start px-3">
                        {selectedJob ? (
                            <div className="row flex-column">
                                <div className="col-12 border-bottom py-1">
                                    <div className="row p-3 d-flex justify-content-between">
                                        <div className="col-6 d-flex">
                                            <h5 className="fw-bold d-flex align-items-center m-0">{selectedJob.jobtitle}</h5>
                                        </div>
                                        <div className="col-6 d-flex flex-wrap gap-1">
                                            {(selectedJob.job_types || []).slice(0, 4).map((type, index) => (
                                                <span key={index} className="badge rounded-pill bg-secondary text-white">
                                                    {type.type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="p-3">
                                        <h5 className="pt-2 fw-bold">About The Job</h5>
                                        <p className="p-2">{selectedJob.description}</p>
                                        <h5 className="py-2 fw-bold">Responsibilities</h5>
                                        <ul>
                                            <li>Develop and maintain web applications</li>
                                            <li>Collaborate with cross-functional teams</li>
                                            <li>Write clean, efficient, and testable code</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="p-3">
                                        <h5 className="pb-3 fw-bold">Required Skills</h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="skill-item px-3 py-1 border rounded">ReactJS</span>
                                            <span className="skill-item px-3 py-1 border rounded">Node.js</span>
                                            <span className="skill-item px-3 py-1 border rounded">JavaScript (ES6+)</span>
                                            <span className="skill-item px-3 py-1 border rounded">HTML/CSS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No job selected</div>
                        )}
                    </div>

                    {/* Third Column: Company Info and Other Info */}
                    <div className="col-md-3 bg-white border border-left d-none d-sm-block rounded-end">
                        {selectedJob ? (
                            <div className="row flex-column px-2 py-1">
                                {/* Job Details Section */}
                                <div className="border-bottom bg-white d-block d-md-flex flex-column flex-md-row align-items-md-center justify-content-between py-3">
                                    <h5 className="fw-bold text-center text-md-start mb-md-0">
                                        {selectedJob?.company?.company_name.slice(0, 20)}
                                    </h5>
                                    <img
                                        src="/assets/cardlogo.jpg"
                                        alt="Company Logo"
                                        className="me-md-2 mx-auto mx-md-0"
                                        style={{ width: '30px', height: '27px' }}
                                    />
                                </div>
                                <div className="bg-white mt-3">
                                    <div className="mt-3">
                                        <div className="mb-2">
                                            <h5 className="fw-bold">Foundation Date</h5>
                                            <p>{selectedJob?.company?.company_foundation_date}</p>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold">Location</h5>
                                            <p>{selectedJob?.company?.company_location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Other Information Section */}
                                <div className="bg-white mt-3">
                                    <div className="pt-3">
                                        <h5 className="fw-bold">Other Information</h5>
                                        <div className="d-flex flex-wrap">
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-muted">&#9733;</span>
                                        </div>
                                        <h6 className="mt-2">Payment Verified</h6>
                                        <p>Yes</p>
                                        <h6>65+ Spend</h6>
                                        <p>$1000+</p>
                                    </div>
                                </div>

                                {/* Services Section */}
                                <div className="bg-white mt-3">
                                    <div className="pt-3">
                                        <h5 className="fw-bold">Services</h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="border px-2 rounded">Backend</span>
                                            <span className="border px-2 rounded">Frontend</span>
                                            <span className="border px-2 rounded">WordPress</span>
                                        </div>
                                        <div className="d-flex justify-content-center mt-4">
                                            <Link
                                                href={{
                                                    pathname: '/users/Apply',
                                                    query: { id: id, company_id: selectedJob.company.id },
                                                }}
                                                className="btn py-2 btn-primary rounded-pill w-100 text-center hover-bg-dark hover-text-white"
                                            >
                                                Apply
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No job selected</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
