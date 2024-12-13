'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateRolePage() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/permissions');
            setPermissions(response.data.permissions);
            setError('');
        } catch {
            setError('Failed to fetch permissions.');
        }
    };

    const handleCheckboxChange = (permissionId) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionId)
                ? prev.filter((id) => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/roles', {
                name,
                permissions: selectedPermissions,
            });

            setSuccessMessage(response.data.message);
            setError('');
            router.push('/admin/roles/role-list');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors.name?.[0] || 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <section className="p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xxl-11">
                        <div className="card border-light-subtle shadow-sm">
                            <div className="row g-0">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                    <div className="col-12 col-lg-11 col-xl-10">
                                        <div className="card-body p-3 p-md-4 p-xl-5">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h4 className="mb-0">Create Role</h4>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row gy-3">
                                                    <div className="col-12">
                                                        <div className="form-floating">
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                className="form-control"
                                                                placeholder="Enter Role Name"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                required
                                                            />
                                                            <label htmlFor="name">Role Name</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <label className="form-label">Assign Permissions</label>
                                                        <div className="row">
                                                            {permissions.map((permission) => (
                                                                <div className="col-6 col-md-4" key={permission.id}>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`permission-${permission.id}`}
                                                                            className="form-check-input"
                                                                            value={permission.id}
                                                                            onChange={() => handleCheckboxChange(permission.id)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`permission-${permission.id}`}
                                                                            className="form-check-label"
                                                                        >
                                                                            {permission.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

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
    );
}
