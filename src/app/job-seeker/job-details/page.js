'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import NavBar from '@/sections/NavBar';
import { FaRegBookmark } from "react-icons/fa";
import jobsData from '@/data/jobsData';
import Link from 'next/link';

export default function page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const sortedJobs = [...jobsData].sort((a, b) => (a.id === parseInt(id) ? -1 : 1));
    return (
        <div>
            <NavBar />
            <div className="container-fluid px-4 ">
                <div className="row pt-3">
                    <div className=" col-md-3 d-none d-sm-block">
                        <div className="">
                            {sortedJobs.map(job => (
                                <div key={job.id} className="col-12  mb-4">
                                    {/* Card */}
                                    <div className="card shadow-sm border-1 h-100  rounded-4 bg-white p-1">
                                        <div className="card-body p-0" >
                                            {/* First Section */}
                                            <div className='rounded-4 p-2' style={{ backgroundColor: '#ffe1cc' }} >
                                                <div className="p-1">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <span className="text-black small border border-0 rounded-pill px-2 py-1 bg-white">{job.postingDate}</span>
                                                        <FaRegBookmark className='me-1' />
                                                    </div>

                                                    <h6 className="fw-semibold m-0">{job.companyName}</h6>
                                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                                        <div className="col-8 d-flex  align-items-center">
                                                            <p className="fw-bold text-truncate-2-lines  mb-0">
                                                                {job.jobTitle}
                                                            </p>
                                                        </div>
                                                        <div className='ms-auto'>
                                                            <img src={job.jobTypeLogo} alt="" className="rounded-pill" width="25" height="25" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-wrap gap-1 ">
                                                        {job.jobLevel.map((level, index) => (
                                                            <div key={index} className="border border-dark rounded-pill text-center px-2 pb-1 d-inline-block">
                                                                <small className="d-inline-block text-center" style={{ color: '#87786e', fontWeight: '400', fontSize: '12px' }}>
                                                                    {level}
                                                                </small>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Second Section */}
                                            <div className=" p-2">
                                                <div className='d-flex justify-content-between align-items-center p-2'>
                                                    <div>
                                                        <p className="fw-bold mb-0">{job.salary}</p>
                                                        <span className="text-muted small">{job.location}</span>
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

                    <div className=" col-md-6 col-sm-12 bg-white rounded-start px-3">
                        {/* <div className="p-3 border"> */}
                        <div className="row flex-column">
                            <div className="col-12 border-bottom py-1">
                                <div className="row p-3 d-flex justify-content-between">
                                    <div className="col-6  d-flex ">
                                        <h5 className="fw-bold d-flex align-items-center m-0">Job Title</h5>
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
                                    <p className='p-2'>
                                        This is an exciting opportunity for a software developer to join a growing tech company.
                                        This is an exciting opportunity for a software developer to join a growing tech company.
                                        This is an exciting opportunity for a software developer to join a growing tech company.
                                        This is an exciting opportunity for a software developer to join a growing tech company.
                                    </p>
                                    <h5 className='py-2 fw-bold' >Responsibilities</h5>
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
                        {/* </div> */}
                    </div>

                    <div className="col-md-3 bg-white border border-left  d-none d-sm-block rounded-end">
                        <div className="">
                            <div className="row flex-column px-2">
                                {/* First Column: Company Info */}
                                <div className="border-bottom bg-white d-none d-sm-block">
                                    <div className="">
                                        {/* Company Name with Logo */}
                                        <div className="d-flex align-items-center justify-content-between py-3">
                                            <h5 className='fw-bold'>Company Name</h5>
                                            <img src="/assets/cardlogo.jpg" alt="Company Logo" className="me-2" style={{ width: '30px', height: '30px' }} />
                                        </div>

                                        {/* Foundation Date and Location */}
                                        <div className="d-flex flex-column justify-content-around mt-3">
                                            <div className="mb-2">
                                                <h6 className='fw-bold'>Foundation</h6>
                                                <p>January 1, 2000</p>
                                            </div>
                                            <div className=''>
                                                <h6 className='fw-bold'>Location</h6>
                                                <p>New York, USA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Second Column: Other Information */}
                                <div className=" bg-white  d-none d-sm-block ">
                                    <div className="pt-3">
                                        {/* Other Information Heading */}
                                        <h5 className='fw-bold'>Other Information</h5>
                                        {/* 5 Stars Rating */}
                                        <div className="d-flex">
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-warning">&#9733;</span>
                                            <span className="text-muted">&#9733;</span>
                                        </div>
                                        {/* Payment Verified */}
                                        <h6>Payment Verified</h6>
                                        <p>Yes</p>
                                        {/* 65+ Spend */}
                                        <h6>65+ Spend</h6>
                                        <p>$1000+</p>
                                    </div>
                                </div>

                                {/* Third Column: Services */}
                                <div className=" bg-white  d-none d-sm-block ">
                                    <div className="pt-3">
                                        {/* Services Heading */}
                                        <h5 className='fw-bold'>Services</h5>
                                        {/* Services List in Border */}
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="border px-2 rounded">Backend</span>
                                            <span className="border px-2 rounded">Front </span>
                                            <span className="border px-2 rounded"> wordPres</span>
                                        </div>
                                        <div className="d-flex mx-3 justify-content-center mt-4">
                                            <Link
                                                href={{
                                                    pathname: '/job-seeker/Apply',
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


        </div>
    )
}
