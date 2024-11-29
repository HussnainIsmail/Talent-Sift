'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '@/sections/NavBar';
import { useRouter } from 'next/navigation';

export default function PermissionList() {
    const [permissions, setPermissions] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Fetch permissions
    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/permissions');
            setPermissions(response.data.permissions); // Assuming the response contains a `permissions` array
            setError('');
        } catch (error) {
            setError('Failed to fetch permissions.');
        }
    };

    // Delete a permission
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/permissions/${id}`);
                setPermissions(permissions.filter((permission) => permission.id !== id));
                setSuccessMessage(response.data.message);
                setError('');
            } catch (error) {
                setSuccessMessage('');
                setError(
                    error.response?.data?.message || 'Failed to delete permission.'
                );
            }
        }
    };


    const handleEdit = (id) => {
        router.push(`/super-admin/permissions-edit?id=${id}`);
    };

    return (
        <div>
            <NavBar />
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h1 className="text-center">Permission List</h1>
                                        <a href="/super-admin/permissions" className="btn btn-primary">Create Permission</a>
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger text-center">
                                            {error}
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="alert alert-success text-center">
                                            {successMessage}
                                        </div>
                                    )}

                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Permission Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permissions.length > 0 ? (
                                                    permissions.map((permission, index) => (
                                                        <tr key={permission.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{permission.name}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-sm btn-primary me-2"
                                                                    onClick={() => handleEdit(permission.id)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => handleDelete(permission.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center">
                                                            No permissions found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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
