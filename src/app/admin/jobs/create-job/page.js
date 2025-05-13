'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function JobPostForm() {
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
        jobLevel: [],
        company: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("User not authenticated.");
            setLoading(false);
            return;
        }
        
        const fetchCompany = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/companies/create', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const company = response.data.data;

                if (company) {
                    setFormData(prev => ({
                        ...prev,
                        company: company.company_name || '',
                    }));
                }
            } catch (error) {
                if (error.response?.status !== 404) {
                    console.error('Error fetching company:', error);
                    setErrors({ general: 'Failed to load company data.' });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, []);

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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.jobtitle) newErrors.jobtitle = "Job title is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (formData.jobType.length === 0) newErrors.jobType = "At least one job type is required";
        if (formData.workLocation.length === 0) newErrors.workLocation = "Work location is required";
        if (formData.jobLevel.length === 0) newErrors.jobLevel = "Job level is required";
        
        if (formData.minSalary && formData.maxSalary && 
            parseInt(formData.minSalary) > parseInt(formData.maxSalary)) {
            newErrors.salary = "Minimum salary cannot be greater than maximum salary";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        const token = localStorage.getItem('token');
        
        const formDataToSend = new FormData();
        formDataToSend.append('jobtitle', formData.jobtitle);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('company', formData.company);
        
        formData.jobType.forEach(job => formDataToSend.append('jobType[]', job));
        formData.workLocation.forEach(location => formDataToSend.append('workLocation[]', location));
        formData.jobLevel.forEach(level => formDataToSend.append('jobLevel[]', level));

        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        formDataToSend.append('subscribe', formData.subscribe);
        formDataToSend.append('minSalary', formData.minSalary);
        formDataToSend.append('maxSalary', formData.maxSalary);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/jobs/store', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert(response.data.message);
            router.push('/admin/jobs/job-list');
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

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="alert alert-danger text-center py-5">{error}</div>;

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
                                                    <div className="col-12">
                                                        <h2 className="h4 text-center mb-4">Job Details</h2>
                                                        {errors.general && (
                                                            <div className="alert alert-danger">{errors.general}</div>
                                                        )}
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
                                                                    className={`form-control ${errors.jobtitle ? 'is-invalid' : ''}`}
                                                                    placeholder="Job title"
                                                                    value={formData.jobtitle}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="jobtitle">Job Title</label>
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
                                                                    value={formData.email}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="email">Email</label>
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
                                                                        value={formData.minSalary}
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
                                                                        value={formData.maxSalary}
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
                                                                    value={formData.description}
                                                                    onChange={handleChange}
                                                                    required
                                                                ></textarea>
                                                                <label htmlFor="description">About the job</label>
                                                                {errors.description && (
                                                                    <div className="invalid-feedback">{errors.description}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Company Input */}
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Company</label>
                                                                <input
                                                                    type="text"
                                                                    name="company"
                                                                    className="form-control"
                                                                    value={formData.company}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Job Type Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Job Type:</label>
                                                            <div className={`mb-3 ${errors.jobType ? 'is-invalid' : ''}`}>
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
                                                            {errors.jobType && (
                                                                <div className="text-danger small">{errors.jobType}</div>
                                                            )}
                                                        </div>

                                                        {/* Work Location Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Work Location:</label>
                                                            <div className={`mb-3 ${errors.workLocation ? 'is-invalid' : ''}`}>
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
                                                            {errors.workLocation && (
                                                                <div className="text-danger small">{errors.workLocation}</div>
                                                            )}
                                                        </div>

                                                        {/* Job Level Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Job Level:</label>
                                                            <div className={`mb-3 ${errors.jobLevel ? 'is-invalid' : ''}`}>
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
                                                                    checked={formData.subscribe === 1}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="subscribe" className="form-check-label">Subscribe to notifications</label>
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="col-12 text-center">
                                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                                {isSubmitting ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                        Submitting...
                                                                    </>
                                                                ) : 'Post Job'}
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