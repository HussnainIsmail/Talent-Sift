'use client'
import NavBar from '@/sections/NavBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactNo: '',
        companyEmail: '',
        foundationDate: '',
        services: '',
        location: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Split services by commas and ensure there are at least 5 services
        const servicesArray = formData.services.split(',').map(service => service.trim());
        if (servicesArray.length < 5) {
            setErrors({ services: "At least 5 services are required, separated by commas." });
            setIsSubmitting(false);
            return;
        }

        const dataToSend = {
            companyName: formData.companyName,
            contactNo: formData.contactNo,
            companyEmail: formData.companyEmail,
            foundationDate: formData.foundationDate,
            services: servicesArray,
            location: formData.location,
        };
        console.log("Data to send:", dataToSend);

        try {
            // Include token in headers for authentication
            const response = await axios.post('http://127.0.0.1:8000/api/companies/store', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            alert(response.data.message);
            router.push('/');
        } catch (error) {
            console.error('Company Registration Failed:', error);
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
                                                        <h2 className="h4 text-center mb-4">Register Your Company</h2>
                                                    </div>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row gy-3">

                                                        
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="companyName"
                                                                    name="companyName"
                                                                    className="form-control"
                                                                    placeholder="Company Name"
                                                                    value={formData.companyName}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="companyName">Company Name</label>
                                                            </div>
                                                        </div>

                                                        {/* Contact Number */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="tel"
                                                                    id="contactNo"
                                                                    name="contactNo"
                                                                    className="form-control"
                                                                    placeholder="Contact Number"
                                                                    value={formData.contactNo}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="contactNo">Contact Number</label>
                                                            </div>
                                                        </div>

                                                        {/* Company Email */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="email"
                                                                    id="companyEmail"
                                                                    name="companyEmail"
                                                                    className="form-control"
                                                                    placeholder="Company Email"
                                                                    value={formData.companyEmail}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="companyEmail">Company Email</label>
                                                            </div>
                                                        </div>

                                                        {/* Foundation Date */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="date"
                                                                    id="foundationDate"
                                                                    name="foundationDate"
                                                                    className="form-control"
                                                                    value={formData.foundationDate}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="foundationDate">Company Foundation Date</label>
                                                            </div>
                                                        </div>

                                                        {/* Services (comma-separated) */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="services"
                                                                    name="services"
                                                                    className="form-control"
                                                                    placeholder="Services"
                                                                    value={formData.services}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="services">Services (separate by commas)</label>
                                                            </div>
                                                            {errors.services && <div className="text-danger">{errors.services}</div>}
                                                        </div>

                                                        {/* Location */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="location"
                                                                    name="location"
                                                                    className="form-control"
                                                                    placeholder="Company Location"
                                                                    value={formData.location}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="location">Company Location</label>
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="col-12 text-center">
                                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                                {isSubmitting ? 'Registering...' : 'Register Company'}
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
