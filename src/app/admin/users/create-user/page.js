'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUserPage() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: '',
        company_name: '',
        contact_no: '',
        company_email: '',
        company_foundation_date: '',
        services: '',
        company_location: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        // Convert services into an array if it's a string
        const payload = {
            ...user,
            services: user.services.split(',').map(s => s.trim()) // assuming services is a comma-separated string
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', payload);
            setSuccessMessage(response.data.message);
            setUser({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                user_type: '',
                company_name: '',
                contact_no: '',
                company_email: '',
                company_foundation_date: '',
                services: '',
                company_location: '',
            });
        } catch (error) {
            console.log('Error response:', error.response); 
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Something went wrong!' });
            }
        }
    };

    return (
        <section className="bg-light p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xxl-10">
                        <div className="card border-light-subtle shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <h2 className="text-center h4 mb-4">Create User</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-3">

                                        {/* Name */}
                                        <div className="col-md-6">
                                            <input type="text" name="name" className="form-control" placeholder="Name"
                                                value={user.name} onChange={handleChange} />
                                            {errors.name && errors.name.map((err, i) => (
                                                <div key={i} className="text-danger">{err}</div>
                                            ))}
                                        </div>

                                        {/* Email */}
                                        <div className="col-md-6">
                                            <input type="email" name="email" className="form-control" placeholder="Email"
                                                value={user.email} onChange={handleChange} />
                                            {errors.email && errors.email.map((err, i) => (
                                                <div key={i} className="text-danger">{err}</div>
                                            ))}
                                        </div>

                                        {/* Password */}
                                        <div className="col-md-6">
                                            <input type="password" name="password" className="form-control" placeholder="Password"
                                                value={user.password} onChange={handleChange} />
                                            {errors.password && errors.password.map((err, i) => (
                                                <div key={i} className="text-danger">{err}</div>
                                            ))}
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="col-md-6">
                                            <input type="password" name="password_confirmation" className="form-control" placeholder="Confirm Password"
                                                value={user.password_confirmation} onChange={handleChange} />
                                        </div>

                                        {/* User Type */}
                                        <div className="col-md-6">
                                            <select name="user_type" className="form-control" value={user.user_type} onChange={handleChange}>
                                                <option value="">Select User Type</option>
                                                <option value="candidate">Candidate</option>
                                                <option value="recuriter">Recruiter</option>
                                            </select>
                                            {errors.user_type && errors.user_type.map((err, i) => (
                                                <div key={i} className="text-danger">{err}</div>
                                            ))}
                                        </div>

                                        {/* Recruiter Fields */}
                                        {user.user_type === 'recuriter' && (
                                            <>
                                                <div className="col-md-6">
                                                    <input type="text" name="company_name" className="form-control" placeholder="Company Name"
                                                        value={user.company_name} onChange={handleChange} />
                                                    {errors.company_name && errors.company_name.map((err, i) => (
                                                        <div key={i} className="text-danger">{err}</div>
                                                    ))}
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" name="contact_no" className="form-control" placeholder="Contact No"
                                                        value={user.contact_no} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="email" name="company_email" className="form-control" placeholder="Company Email"
                                                        value={user.company_email} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="date" name="company_foundation_date" className="form-control"
                                                        value={user.company_foundation_date} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" name="services" className="form-control" placeholder="Services (comma separated)"
                                                        value={user.services} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" name="company_location" className="form-control" placeholder="Company Location"
                                                        value={user.company_location} onChange={handleChange} />
                                                </div>
                                            </>
                                        )}

                                        {/* Error Message */}
                                        {errors.general && (
                                            <div className="col-12">
                                                <div className="alert alert-danger">{errors.general}</div>
                                            </div>
                                        )}

                                        {/* Success Message */}
                                        {successMessage && (
                                            <div className="col-12">
                                                <div className="alert alert-success">{successMessage}</div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn btn-success">Register User</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
