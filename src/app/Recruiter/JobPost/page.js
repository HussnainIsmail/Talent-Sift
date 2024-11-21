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
        image: null
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
            } else if (name === 'jobType' || name === 'workLocation') {
                // Handle job type and work location arrays
                setFormData({
                    ...formData,
                    [name]: checked
                        ? [...formData[name], value]
                        : formData[name].filter(item => item !== value)
                });
            }
        } else if (type === 'file') {
            // Handle file upload
            setFormData({
                ...formData,
                image: files[0]
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

    // console.log('Job Title:', formData.jobtitle);
    // console.log('Email:', formData.email);
    // console.log('Description:', formData.description);
    // console.log('Job Type:', formData.jobType.join(', '));
    // console.log('Work Location:', formData.workLocation.join(', '));
    // console.log('Subscribe to Newsletter:', formData.subscribe);
    // console.log('Uploaded Image:', formData.image ? formData.image.name : 'No image uploaded');
        const formDataToSend = new FormData();
        formDataToSend.append('jobtitle', formData.jobtitle);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('description', formData.description);

        // Append array values for jobType and workLocation
        formData.jobType.forEach(job => formDataToSend.append('jobType[]', job));
        formData.workLocation.forEach(location => formDataToSend.append('workLocation[]', location));

        // Append file if there is one
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        // Append subscription checkbox
        formDataToSend.append('subscribe', formData.subscribe);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/jobs/store', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert(response.data.message);
            router.push('/signin');
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
                                                            <label>Job type:</label>
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
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="workLocation"
                                                                    value="hybrid"
                                                                    id="hybrid"
                                                                    className="form-check-input"
                                                                    checked={formData.workLocation.includes('hybrid')}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="hybrid" className="form-check-label">Hybrid</label>
                                                            </div>
                                                        </div>

                                                        {/* Subscribe Checkbox */}
                                                        <div className="col-12">
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    name="subscribe"
                                                                    id="subscribe"
                                                                    className="form-check-input"
                                                                    checked={formData.subscribe}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="subscribe" className="form-check-label">Subscribe to newsletter</label>
                                                            </div>
                                                        </div>

                                                        {/* Image Upload */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="file"
                                                                    id="image"
                                                                    name="image"
                                                                    className="form-control"
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="image">Upload Image</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                                        </button>
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
