'use client'
import NavBar from '@/sections/NavBar';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [formData, setFormData] = useState({
        jobtitle: '',
        email: '',
        description: '',
        jobType: [],
        workLocation: [],
        subscribe: 0,
        image: null,
        minSalary: '',
        maxSalary: '',
        jobLevel: []
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            if (name === 'subscribe') {
                setFormData({
                    ...formData,
                    [name]: checked ? 1 : 0
                });
            } else if (name === 'jobType' || name === 'workLocation' || name === 'jobLevel') {
                setFormData({
                    ...formData,
                    [name]: checked
                        ? [...formData[name], value]
                        : formData[name].filter(item => item !== value)
                });
            }
        } else if (type === 'file') {
            setFormData({
                ...formData,
                image: files[0]
            });
        } else if (name === 'minSalary' || name === 'maxSalary') {
            // Allow only numeric values
            const sanitizedValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: sanitizedValue
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(formData);
        const formDataToSend = new FormData();
        formDataToSend.append('jobtitle', formData.jobtitle);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('description', formData.description);

        // Append array values for jobType, workLocation, and jobLevel
        formData.jobType.forEach(job => formDataToSend.append('jobType[]', job));
        formData.workLocation.forEach(location => formDataToSend.append('workLocation[]', location));
        formData.jobLevel.forEach(level => formDataToSend.append('jobLevel[]', level));

        // Append file if there is one
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        // Append subscription checkbox
        formDataToSend.append('subscribe', formData.subscribe);

        // Append salary information
        formDataToSend.append('minSalary', formData.minSalary);
        formDataToSend.append('maxSalary', formData.maxSalary);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/jobs/store', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert(response.data.message);
            router.push('/');
        } catch (error) {
            console.error('Job Post Failed:', error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "An error occurred, please try again." });
            }
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            <NavBar />
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card border-light-subtle shadow-sm">
                                <div className="row g-0">
                                    <div className="col-12 d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-lg-11 col-xl-10">
                                            <div className="card-body p-3 p-md-4 p-xl-5">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h2 className="h4 text-center mb-4">Job Details</h2>
                                                    </div>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row gy-3">
                                                        {/* Job Title Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="jobtitle"
                                                                    name="jobtitle"
                                                                    className="form-control"
                                                                    placeholder="Job title"
                                                                    value={formData.jobtitle}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="jobtitle">Job Title</label>
                                                            </div>
                                                        </div>

                                                        {/* Email Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    value={formData.email}
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
                                                                        value={formData.minSalary}
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
                                                                        value={formData.maxSalary}
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
                                                                    value={formData.description}
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
                                                                    checked={formData.jobType.includes('full-time')}
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
                                                                    checked={formData.jobType.includes('part-time')}
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
                                                                    checked={formData.jobType.includes('internship')}
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
                                                                    checked={formData.jobType.includes('project-work')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="project-work" className="form-check-label">Project Work</label>
                                                            </div>
                                                        </div>

                                                        {/* Work Location Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label>Work Location:</label>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="workLocation"
                                                                    value="remote"
                                                                    id="remote"
                                                                    className="form-check-input"
                                                                    checked={formData.workLocation.includes('remote')}
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
                                                                    checked={formData.workLocation.includes('on-site')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="on-site" className="form-check-label">On-site</label>
                                                            </div>
                                                        </div>

                                                        {/* Job Level Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label>Job Level:</label>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="jobLevel"
                                                                    value="entry"
                                                                    id="entry"
                                                                    className="form-check-input"
                                                                    checked={formData.jobLevel.includes('entry')}
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
                                                                    checked={formData.jobLevel.includes('middle')}
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
                                                                    checked={formData.jobLevel.includes('expert')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="expert" className="form-check-label">Expert</label>
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="col-12 text-center">
                                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                                {isSubmitting ? 'Submitting...' : 'Post Job'}
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
