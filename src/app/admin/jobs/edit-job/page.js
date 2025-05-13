'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [jobDetail, setJobDetail] = useState({
        jobtitle: '',
        email: '',
        description: '',
        minSalary: '',
        maxSalary: '',
        jobType: [],
        workLocation: [],
        jobLevel: [],
        subscribe: 0,
        company: '',
        image: null
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (id) {
            fetchJobDetails();
        }
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}/edit`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const job = response.data.job;
            setJobDetail({
                jobtitle: job.jobtitle || '',
                email: job.email || '',
                description: job.description || '',
                minSalary: job.minSalary || '',
                maxSalary: job.maxSalary || '',
                jobType: job.jobTypes?.map(type => type.type) || [],
                workLocation: job.workLocations?.map(loc => loc.location) || [],
                jobLevel: job.jobLevels?.map(level => level.level) || [],
                subscribe: job.subscribe || 0,
                company: job.company?.company_name || '',
                image: job.image || null
            });
            setLoading(false);
        } catch (error) {
            setErrors({ general: 'Failed to fetch job details.' });
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('jobtitle', jobDetail.jobtitle);
            formData.append('email', jobDetail.email);
            formData.append('description', jobDetail.description);
            formData.append('minSalary', jobDetail.minSalary);
            formData.append('maxSalary', jobDetail.maxSalary);
            formData.append('subscribe', jobDetail.subscribe);
            formData.append('company', jobDetail.company);
            
            jobDetail.jobType.forEach(type => formData.append('jobType[]', type));
            jobDetail.workLocation.forEach(loc => formData.append('workLocation[]', loc));
            jobDetail.jobLevel.forEach(level => formData.append('jobLevel[]', level));
            
            if (jobDetail.image instanceof File) {
                formData.append('image', jobDetail.image);
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/jobs/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('Job updated successfully!');
            setTimeout(() => router.push('/admin/jobs/job-list'), 2000);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred while updating the job.' });
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!jobDetail.jobtitle) newErrors.jobtitle = "Job title is required";
        if (!jobDetail.email) newErrors.email = "Email is required";
        if (!jobDetail.description) newErrors.description = "Description is required";
        if (jobDetail.jobType.length === 0) newErrors.jobType = "At least one job type is required";
        if (jobDetail.workLocation.length === 0) newErrors.workLocation = "Work location is required";
        if (jobDetail.jobLevel.length === 0) newErrors.jobLevel = "Job level is required";
        
        if (jobDetail.minSalary && jobDetail.maxSalary && 
            parseInt(jobDetail.minSalary) > parseInt(jobDetail.maxSalary)) {
            newErrors.salary = "Minimum salary cannot be greater than maximum salary";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            setJobDetail(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else if (name === 'minSalary' || name === 'maxSalary') {
            const sanitizedValue = value.replace(/[^0-9]/g, '');
            setJobDetail(prev => ({
                ...prev,
                [name]: sanitizedValue
            }));
        } else {
            setJobDetail(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        
        setJobDetail(prev => {
            const currentValues = prev[name] || [];
            
            if (checked) {
                return {
                    ...prev,
                    [name]: [...currentValues, value]
                };
            } else {
                return {
                    ...prev,
                    [name]: currentValues.filter(item => item !== value)
                };
            }
        });
    };

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setJobDetail(prev => ({
            ...prev,
            [name]: checked ? 1 : 0
        }));
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (errors.general) return <div className="alert alert-danger text-center py-5">{errors.general}</div>;

    return (
        <div>
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
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h2 className="h4 text-center">Edit Job Details</h2>
                                                        <a href="/admin/jobs/job-list" className="btn btn-primary">Back to Job List</a>
                                                    </div>
                                                    {errors.general && (
                                                        <div className="alert alert-danger">{errors.general}</div>
                                                    )}
                                                    {successMessage && (
                                                        <div className="alert alert-success">{successMessage}</div>
                                                    )}
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
                                                                    className={`form-control ${errors.jobtitle ? 'is-invalid' : ''}`}
                                                                    placeholder="Job title"
                                                                    value={jobDetail.jobtitle}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="jobtitle">Job Title*</label>
                                                                {errors.jobtitle && (
                                                                    <div className="invalid-feedback">{errors.jobtitle}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Email Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                                    placeholder="Email"
                                                                    value={jobDetail.email}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="email">Email*</label>
                                                                {errors.email && (
                                                                    <div className="invalid-feedback">{errors.email}</div>
                                                                )}
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
                                                                        className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                                                        placeholder="Minimum Salary"
                                                                        value={jobDetail.minSalary}
                                                                        onChange={handleChange}
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
                                                                        className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                                                        placeholder="Maximum Salary"
                                                                        value={jobDetail.maxSalary}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <label htmlFor="maxSalary">Max Salary</label>
                                                                </div>
                                                            </div>
                                                            {errors.salary && (
                                                                <div className="text-danger small">{errors.salary}</div>
                                                            )}
                                                        </div>

                                                        {/* Description Textarea */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <textarea
                                                                    id="description"
                                                                    name="description"
                                                                    rows="5"
                                                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                                    placeholder="Description"
                                                                    value={jobDetail.description}
                                                                    onChange={handleChange}
                                                                    required
                                                                ></textarea>
                                                                <label htmlFor="description">About the job*</label>
                                                                {errors.description && (
                                                                    <div className="invalid-feedback">{errors.description}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Company Input */}
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Company*</label>
                                                                <input
                                                                    type="text"
                                                                    name="company"
                                                                    className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                                                                    value={jobDetail.company}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                {errors.company && (
                                                                    <div className="invalid-feedback">{errors.company}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Job Type Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Job Type:*</label>
                                                            <div className={`mb-3 ${errors.jobType ? 'is-invalid' : ''}`}>
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="jobType"
                                                                        value="full-time"
                                                                        id="full-time"
                                                                        className="form-check-input"
                                                                        checked={jobDetail.jobType.includes('full-time')}
                                                                        onChange={handleCheckboxChange}
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
                                                                        onChange={handleCheckboxChange}
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
                                                                        onChange={handleCheckboxChange}
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
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    <label htmlFor="project-work" className="form-check-label">Project Work</label>
                                                                </div>
                                                            </div>
                                                            {errors.jobType && (
                                                                <div className="text-danger small">{errors.jobType}</div>
                                                            )}
                                                        </div>

                                                        {/* Work Location Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Work Location:*</label>
                                                            <div className={`mb-3 ${errors.workLocation ? 'is-invalid' : ''}`}>
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="workLocation"
                                                                        value="remote"
                                                                        id="remote"
                                                                        className="form-check-input"
                                                                        checked={jobDetail.workLocation.includes('remote')}
                                                                        onChange={handleCheckboxChange}
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
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    <label htmlFor="on-site" className="form-check-label">On-site</label>
                                                                </div>
                                                            </div>
                                                            {errors.workLocation && (
                                                                <div className="text-danger small">{errors.workLocation}</div>
                                                            )}
                                                        </div>

                                                        {/* Job Level Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Job Level:*</label>
                                                            <div className={`mb-3 ${errors.jobLevel ? 'is-invalid' : ''}`}>
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="jobLevel"
                                                                        value="entry"
                                                                        id="entry"
                                                                        className="form-check-input"
                                                                        checked={jobDetail.jobLevel.includes('entry')}
                                                                        onChange={handleCheckboxChange}
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
                                                                        onChange={handleCheckboxChange}
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
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    <label htmlFor="expert" className="form-check-label">Expert</label>
                                                                </div>
                                                            </div>
                                                            {errors.jobLevel && (
                                                                <div className="text-danger small">{errors.jobLevel}</div>
                                                            )}
                                                        </div>

                                                        {/* Image Upload */}
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label htmlFor="image" className="form-label">Job Image (Optional)</label>
                                                                <input
                                                                    type="file"
                                                                    id="image"
                                                                    name="image"
                                                                    className="form-control"
                                                                    onChange={handleChange}
                                                                    accept="image/*"
                                                                />
                                                                {jobDetail.image && !(jobDetail.image instanceof File) && (
                                                                    <div className="mt-2">
                                                                        <small>Current Image:</small>
                                                                        <img 
                                                                            src={`http://127.0.0.1:8000/storage/${jobDetail.image}`} 
                                                                            alt="Current job image" 
                                                                            className="img-thumbnail mt-2"
                                                                            style={{ maxHeight: '100px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Subscribe Checkbox */}
                                                        <div className="col-12">
                                                            <div className="form-check mb-3">
                                                                <input
                                                                    type="checkbox"
                                                                    name="subscribe"
                                                                    id="subscribe"
                                                                    className="form-check-input"
                                                                    checked={jobDetail.subscribe === 1}
                                                                    onChange={handleToggleChange}
                                                                />
                                                                <label htmlFor="subscribe" className="form-check-label">Subscribe to notifications</label>
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
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