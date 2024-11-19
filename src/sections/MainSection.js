import React from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import jobsData from '../data/jobsData';
import { FaRegBookmark } from "react-icons/fa";
import '../app/globals.css';

export default function MainSection() {
    return (
        <div className="d-flex flex-column flex-md-row">
            {/* Sidebar Section */}
            <SideBar />
            {/* Main Content Section */}
            <div className="main-content flex-grow-1 py-4  col-12 col-md-9">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <h2 className="me-2">Recommended Jobs</h2>
                            <span className="text-black border border-2 rounded-pill px-2  fw-bolder">
                                200
                            </span>
                        </div>
                        <a className="fw-bolder text-black border border-2 px-3  rounded-pill text-decoration-none bg-transparent custom-hide-sm" href="#">
                            Most Recent
                        </a>
                    </div>

                    {/* Card Grid */}
                    <div className="row">
                        {jobsData.map(job => (
                            <div key={job.id} className="col-12 col-md-4 col-xl-4 mb-4">
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
                                                        pathname: '/JobSeeker/JobDetails',
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
