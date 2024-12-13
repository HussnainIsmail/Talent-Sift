'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function EditUserPage() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');  // Get 'id' from the URL query parameters

    useEffect(() => {
        if (id) {
            fetchUser(id);
            fetchRoles();
        }
    }, [id]);

    const fetchUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrors({ general: 'Authentication token is missing.' });
                setLoading(false);
                return;
            }
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUser(response.data.user);
            setLoading(false);
        } catch (error) {
            setErrors({ general: error.response?.data?.message || 'Failed to fetch user details.' });
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrors({ general: 'Authentication token is missing.' });
                return;
            }
            const response = await axios.get('http://127.0.0.1:8000/api/roles', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setRoles(response.data.roles);
        } catch (error) {
            setErrors({ general: error.response?.data?.message || 'Failed to fetch roles.' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');  // Clear success message before submitting
        setErrors({});  // Clear previous errors before submitting

        // Check if all fields are filled
        if (!user.name || !user.email || !user.role) {
            setErrors({ general: 'All fields are required.' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrors({ general: 'Authentication token is missing.' });
                return;
            }

            const response = await axios.put(`http://127.0.0.1:8000/api/users/update/${id}`, user, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrors({
                general: error.response?.data?.message || 'Failed to update user.',
                ...error.response?.data?.errors,
            });
            setSuccessMessage('');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-10">
                            <div className="card border-light-subtle shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h2 className="h4 mb-4">Edit User</h2>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-3">

                                            {/* Name */}
                                            <div className="col-12 col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="User Name"
                                                        value={user.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="name">User Name</label>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="col-12 col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="User Email"
                                                        value={user.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="email">User Email</label>
                                                </div>
                                            </div>

                                            {/* Role */}
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        value={user.role}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="" disabled>Select Role</option>
                                                        {roles.map(role => (
                                                            <option key={role.id} value={role.name}>
                                                                {role.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="role">User Role</label>
                                                </div>
                                            </div>

                                            {/* General Error */}
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
                                                <button type="submit" className="btn btn-primary">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
