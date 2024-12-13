'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [jobDetail, setJobDetail] = useState({
        name: '',
        description: '',
        // Add other fields you expect from the response
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (id) {
            fetchJobDetails();
        }
    }, [id]);

    // Fetch the job details for editing
    const fetchJobDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}/edit`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Store the full job object in the jobDetail state
            setJobDetail(response.data.job);
        } catch (error) {
            setError('Failed to fetch job details.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/jobs/${id}`, jobDetail, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // After the update, store the updated job object
            setJobDetail(response.data.job);
            setSuccessMessage(response.data.message);  // Success message
            setError('');  // Clear any previous errors

            // Redirect to the job list page after successful update
            router.push('/super-admin/jobs-list');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors.name ? error.response.data.errors.name[0] : 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    // Handle changes in the form fields and update the jobDetail state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetail(prevState => ({
            ...prevState,
            [name]: value,  // Dynamically update the correct field in the jobDetail state
        }));
    };

    return (
        <div>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card border-light-subtle shadow-sm">
                                <div className="row g-0">
                                    <div className="col-12 d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-lg-11 col-xl-10">
                                            <div className="card-body p-3 p-md-4 p-xl-5">
                                                <div className="row">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h2 className="text-center">Edit Job Details</h2>
                                                        <a href="/super-admin/jobs-list" className="btn btn-primary">Job List</a>
                                                    </div>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row gy-3">
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="jobtitle"
                                                                    name="jobtitle"
                                                                    className="form-control"
                                                                    placeholder="Job title"
                                                                    value={setJobDetail.jobtitle}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="jobtitle">Job Title</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    value={setJobDetail.email}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="email">Email</label>
                                                            </div>
                                                        </div>

                                                        {/* Minimum Salary Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text">$</span>
                                                                <div className="form-floating">
                                                                    <input
                                                                        type="text"
                                                                        id="minSalary"
                                                                        name="minSalary"
                                                                        className="form-control"
                                                                        placeholder="Minimum Salary"
                                                                        value={setJobDetail.minSalary}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                    <label htmlFor="minSalary">Min Salary</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Maximum Salary Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text">$</span>
                                                                <div className="form-floating">
                                                                    <input
                                                                        type="text"
                                                                        id="maxSalary"
                                                                        name="maxSalary"
                                                                        className="form-control"
                                                                        placeholder="Maximum Salary"
                                                                        value={setJobDetail.maxSalary}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                    <label htmlFor="maxSalary">Max Salary</label>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {/* Description Textarea */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <textarea
                                                                    id="description"
                                                                    name="description"
                                                                    rows="5"
                                                                    className="form-control"
                                                                    placeholder="Description"
                                                                    value={jobDetail.description}
                                                                    onChange={handleChange}
                                                                    required
                                                                ></textarea>
                                                                <label htmlFor="description">About the job</label>
                                                            </div>
                                                        </div>

                                                        {/* Job Type Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label>Job Type:</label>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobType"
                                                                    value="full-time"
                                                                    id="full-time"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobType.includes('full-time')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="full-time" className="form-check-label">Full-Time</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobType"
                                                                    value="part-time"
                                                                    id="part-time"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobType.includes('part-time')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="part-time" className="form-check-label">Part-Time</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobType"
                                                                    value="internship"
                                                                    id="internship"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobType.includes('internship')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="internship" className="form-check-label">Internship</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobType"
                                                                    value="project-work"
                                                                    id="project-work"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobType.includes('project-work')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="project-work" className="form-check-label">Project Work</label>
                                                            </div>
                                                        </div>

                                                        {/* Work Location Checkbox */}
                                                        {/* <div className="col-12 col-md-6">
                                                            <label>Work Location:</label>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="workLocation"
                                                                    value="remote"
                                                                    id="remote"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.workLocation.includes('remote')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="remote" className="form-check-label">Remote</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="workLocation"
                                                                    value="on-site"
                                                                    id="on-site"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.workLocation.includes('on-site')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="on-site" className="form-check-label">On-site</label>
                                                            </div>
                                                        </div> */}

                                                        {/* Job Level Checkbox */}
                                                        {/* <div className="col-12 col-md-6">
                                                            <label>Job Level:</label>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobLevel"
                                                                    value="entry"
                                                                    id="entry"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobLevel.includes('entry')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="entry" className="form-check-label">Entry Level</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobLevel"
                                                                    value="middle"
                                                                    id="middle"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobLevel.includes('middle')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="middle" className="form-check-label">Middle Level</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobLevel"
                                                                    value="expert"
                                                                    id="expert"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.jobLevel.includes('expert')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="expert" className="form-check-label">Expert</label>
                                                            </div>
                                                        </div> */}


                                                        {error && (
                                                            <div className="col-12">
                                                                <div className="alert alert-danger">{error}</div>
                                                            </div>
                                                        )}

                                                        {successMessage && (
                                                            <div className="col-12">
                                                                <div className="alert alert-success">{successMessage}</div>
                                                            </div>
                                                        )}

                                                        <div className="col-12 text-center">
                                                            <button type="submit" className="btn btn-primary">
                                                                Update Job
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
