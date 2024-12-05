'use client';
import NavBar from '@/sections/NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
        cv_path: null,
        job_id: null,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobId = searchParams.get('id'); 
    const token = localStorage.getItem('token');
    // Set job_id in formData when jobId exists
    useEffect(() => {
        if (jobId) {
            setFormData(prev => ({
                ...prev,
                job_id: jobId,  // Update formData with job_id from URL
            }));
        }
    }, [jobId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            cv_path: file,
        });
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Access denied. Please log in first.');
            router.push('/auth/signin');
        }
    }, [router]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});  // Reset errors before submitting
        setIsSubmitting(true);  // Disable submit button

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('first_name', formData.first_name);
        formDataToSubmit.append('last_name', formData.last_name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('contact_no', formData.contact_no);
        formDataToSubmit.append('cv', formData.cv_path);
        formDataToSubmit.append('job_id', formData.job_id);  // Add job_id to form data

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/applications/store', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                     'Authorization': `Bearer ${token}` 

                },
            });

            // Show success message and redirect
            alert(response.data.message);
            router.push('/');  // Redirect to the sign-in page
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);  // Set validation errors
            } else {
                setErrors({ general: 'An error occurred, please try again.' });  // General error
            }
        }

        setIsSubmitting(false);  // Re-enable submit button
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
                                                        <h2 className="h4 text-center mb-4">Apply For Job</h2>
                                                    </div>
                                                </div>
                                                
                                                {/* General Error */}
                                                {errors.general && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {errors.general}
                                                    </div>
                                                )}
                                                
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row gy-3">
                                                        {/* First Name Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="first-name"
                                                                    name="first_name"
                                                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                                                    placeholder="First Name"
                                                                    value={formData.first_name}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="first-name">First Name</label>
                                                                {errors.first_name && (
                                                                    <div className="invalid-feedback">{errors.first_name[0]}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Last Name Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="last-name"
                                                                    name="last_name"
                                                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                                                    placeholder="Last Name"
                                                                    value={formData.last_name}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="last-name">Last Name</label>
                                                                {errors.last_name && (
                                                                    <div className="invalid-feedback">{errors.last_name[0]}</div>
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
                                                                    <div className="invalid-feedback">{errors.email[0]}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Contact No Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="tel"
                                                                    id="contact-no"
                                                                    name="contact_no"
                                                                    className={`form-control ${errors.contact_no ? 'is-invalid' : ''}`}
                                                                    placeholder="Contact No"
                                                                    value={formData.contact_no}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="contact-no">Contact No</label>
                                                                {errors.contact_no && (
                                                                    <div className="invalid-feedback">{errors.contact_no[0]}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* CV Document Upload */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="cv" className="form-label">
                                                                    Upload CV:
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id="cv"
                                                                    name="cv"
                                                                    accept=".pdf,.doc,.docx"
                                                                    className={`form-control ${errors.cv ? 'is-invalid' : ''}`}
                                                                    onChange={handleFileChange}
                                                                    required
                                                                />
                                                                {errors.cv && (
                                                                    <div className="invalid-feedback">{errors.cv[0]}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="col-12 d-flex justify-content-center mt-4">
                                                            <button type="submit" className="btn btn-dark btn-lg" disabled={isSubmitting}>
                                                                {isSubmitting ? 'Submitting...' : 'Submit'}
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
