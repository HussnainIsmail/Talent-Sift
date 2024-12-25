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
        // Fetching jobs data
        axios.get('http://localhost:8000/api/jobs/show')
            .then((response) => {
                const fetchedJobs = response.data.jobs;
                setJobs(fetchedJobs);

                // If no `id` in query params, set the first job's id in the URL
                if (!id && fetchedJobs.length > 0) {
                    const firstJobId = fetchedJobs[0].id;
                    router.push(`?id=${firstJobId}`);
                    setSelectedJob(fetchedJobs[0]);
                } else {
                    // Set the job matching the `id` in query params as selected
                    const selected = fetchedJobs.find(job => job.id === parseInt(id));
                    setSelectedJob(selected || fetchedJobs[0]);
                }
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, [id, router]);

    // Reorder jobs to ensure the selected job comes to the top
    const sortedJobs = jobs.filter(job => job.id === parseInt(id))
        .concat(jobs.filter(job => job.id !== parseInt(id)));

    useEffect(() => {
        // Ensure the selected job ID is updated when the URL ID changes
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
                            </div>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className=" col-md-6 col-sm-12 bg-white rounded-start px-3">
                        {selectedJob ? (
                            <div className="row flex-column">
                                <div className="col-12 border-bottom py-1">
                                    <div className="row p-3 d-flex justify-content-between">
                                        <div className="col-6  d-flex ">
                                            <h5 className="fw-bold d-flex align-items-center m-0">{selectedJob.jobtitle}</h5>
                                        </div>
                                        <div className="col-6 d-flex flex-wrap">
                                            <span className="px-2 py-1 mx-1 border border-1 rounded">Expert</span>
                                            <span className="px-2 py-1 mx-1 border border-1 rounded">Intern</span>
                                            <span className="px-2 py-1 mx-1 border border-1 rounded">Remote</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 ">
                                    <div className="p-3 ">
                                        <h5 className='pt-2 fw-bold'>About The Job</h5>
                                        <p className='p-2'>{selectedJob.description}</p>
                                        <h5 className='py-2 fw-bold'>Responsibilities</h5>
                                        <ul >
                                        <li>Develop and maintain web applications</li>
                                        <li>Collaborate with cross-functional teams</li>
                                        <li>Write clean, efficient, and testable code</li>
                                    </ul>
                                    </div>
                                </div>

                                <div className="col-12 ">
                                    <div className="p-3 ">
                                        <h5 className='pb-3 fw-bold'>Required Skills</h5>
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
                        <div className="row flex-column px-2">
                            <div className="border-bottom bg-white d-none d-sm-block">
                                <div className="d-flex align-items-center justify-content-between py-3">
                                    <h5 className='fw-bold'>{selectedJob?.companyName}</h5>
                                    <img src="/assets/cardlogo.jpg" alt="Company Logo" className="me-2" style={{ width: '30px', height: '30px' }} />
                                </div>
                                <div className="d-flex flex-column justify-content-around mt-3">
                                    <div className="mb-2">
                                        <h6 className='fw-bold'>Foundation</h6>
                                        <p>{selectedJob?.foundationDate}</p>
                                    </div>
                                    <div>
                                        <h6 className='fw-bold'>Location</h6>
                                        <p>{selectedJob?.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white d-none d-sm-block">
                                <div className="pt-3">
                                    <h5 className='fw-bold'>Other Information</h5>
                                    <div className="d-flex">
                                        <span className="text-warning">&#9733;</span>
                                        <span className="text-warning">&#9733;</span>
                                        <span className="text-warning">&#9733;</span>
                                        <span className="text-warning">&#9733;</span>
                                        <span className="text-muted">&#9733;</span>
                                    </div>
                                    <h6>Payment Verified</h6>
                                    <p>Yes</p>
                                    <h6>65+ Spend</h6>
                                    <p>$1000+</p>
                                </div>
                            </div>

                            <div className="bg-white d-none d-sm-block">
                                <div className="pt-3">
                                    <h5 className='fw-bold'>Services</h5>
                                    <div className="d-flex flex-wrap gap-2">
                                        <span className="border px-2 rounded">Backend</span>
                                        <span className="border px-2 rounded">Frontend</span>
                                        <span className="border px-2 rounded">WordPress</span>
                                    </div>
                                    <div className="d-flex mx-3 justify-content-center mt-4">
                                        <Link
                                            href={{
                                                pathname: '/users/Apply',
                                                query: { id: id },
                                            }}
                                            className="btn py-2 btn-primary rounded-pill w-100 text-center hover-bg-dark hover-text-white"
                                        >
                                            Apply
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
