'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [name, setName] = useState(''); // Permission name state
    const [error, setError] = useState(''); // Error message state
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const router = useRouter(); // Navigation router

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            if (!token) {
                setError('Authentication token is missing. Please log in.');
                return;
            }

            // Make API request to create permission
            const response = await axios.post(
                'http://127.0.0.1:8000/api/permissions',
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                }
            );

            setSuccessMessage(response.data.message); // Display success message
            setError(''); // Clear any previous errors
            router.push('/admin/permissions/permission-list'); // Navigate to permission list
        } catch (error) {
            if (error.response && error.response.data.errors) {
                // Handle validation errors
                setError(error.response.data.errors.name ? error.response.data.errors.name[0] : 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
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
                                                        <h4 className="text-center">Create Permission</h4>
                                                    </div>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row gy-3">
                                                        <div className="col-12 col-md-12">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    name="name"
                                                                    className="form-control"
                                                                    placeholder="Permission Name"
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    required
                                                                />
                                                                <label htmlFor="name">Permission Name</label>
                                                            </div>
                                                        </div>

                                                        {/* Display error message */}
                                                        {error && (
                                                            <div className="col-12">
                                                                <div className="alert alert-danger">{error}</div>
                                                            </div>
                                                        )}

                                                        {/* Display success message */}
                                                        {successMessage && (
                                                            <div className="col-12">
                                                                <div className="alert alert-success">{successMessage}</div>
                                                            </div>
                                                        )}

                                                        <div className="col-12 text-center">
                                                            <button type="submit" className="btn btn-primary">
                                                                Submit
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
