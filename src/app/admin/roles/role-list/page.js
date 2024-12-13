'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const permissions = JSON.parse(localStorage.getItem('permissions')) || [];

    // Fetch roles
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/roles');
            setRoles(response.data.roles); 
            setError('');
        } catch (error) {
            setError('Failed to fetch roles.');
        }
    };

    // Delete a role
    const handleDelete = async (id) => {
        if (!permissions.includes('delete-role')) {
            setError('You do not have permission to delete roles.');
            return;
        }

        if (confirm('Are you sure you want to delete this role?')) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/roles/${id}`);
                setRoles(roles.filter((role) => role.id !== id));
                setSuccessMessage(response.data.message);
                setError('');
            } catch (error) {
                setSuccessMessage('');
                setError(error.response?.data?.message || 'Failed to delete role.');
            }
        }
    };

    // Navigate to edit role page
    const handleEdit = (id) => {
        if (!permissions.includes('edit-role')) {
            setError('You do not have permission to edit roles.');
            return;
        }

        router.push(`/admin/roles/edit-role?id=${id}`);
    };
    // Navigate to give permissions page
    const handleGivePermissions = (id) => {
        router.push(`/super-admin/roles/add-permissions?id=${id}`);
    };

    return (
        <div>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="text-center">Roles List</h4>
                                    {/* <a href="/admin/roles/create-roles" className="btn btn-primary">Create Role</a> */}
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
                                                <th>Role Name</th>
                                                <th>Permissions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roles.length > 0 ? (
                                                roles.map((role, index) => (
                                                    <tr key={role.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{role.name}</td>
                                                        <td>
                                                            {role.permissions && role.permissions.length > 0 ? (
                                                                role.permissions.map((permission, permIndex) => (
                                                                    <span key={permIndex} className="badge bg-info me-1">
                                                                        {permission}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="text-muted">No permissions</span>
                                                            )}
                                                        </td>
                                                        <td className="text-center align-middle">
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                {permissions.includes('edit-role') && (
                                                                    <button
                                                                        className="btn btn-sm btn-secondary me-2"
                                                                        onClick={() => handleEdit(role.id)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                )}
                                                                {permissions.includes('delete-role') && (
                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => handleDelete(role.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>


                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No roles found.
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
            </section>
        </div>
    );
}
