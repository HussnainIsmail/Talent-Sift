'use client';
import NavBar from '@/sections/NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get role ID from URL parameters
    console.log(id);
    const [name, setName] = useState(''); // Store role name
    const [error, setError] = useState(''); // Error state
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const router = useRouter();
    const [permissions, setPermissions] = useState([]); // All available permissions
    const [selectedPermissions, setSelectedPermissions] = useState([]); // Permissions selected for the role

    useEffect(() => {
        fetchRoleAndPermissions(); // Fetch role details and permissions on page load
    }, []);

    // Fetch role details and available permissions
    const fetchRoleAndPermissions = async () => {
        try {
            // Fetch role details
            const roleResponse = await axios.get(`http://127.0.0.1:8000/api/roles/${id}/edit`);
            setName(roleResponse.data.role.name);

            // Fetch all available permissions
            const permissionsResponse = await axios.get('http://127.0.0.1:8000/api/permissions');
            setPermissions(permissionsResponse.data.permissions);

            // Set selected permissions based on the role's current permissions
            const rolePermissions = roleResponse.data.role.permissions.map(permission => permission.id);
            setSelectedPermissions(rolePermissions);
        } catch (error) {
            setError('Failed to fetch role details or permissions.');
        }
    };

    // Handle checkbox change for permissions
    const handlePermissionChange = (e) => {
        const permissionId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedPermissions([...selectedPermissions, permissionId]);
        } else {
            setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/roles/${id}`, { 
                name, 
                permissions: selectedPermissions 
            });
            setSuccessMessage(response.data.message);
            setError('');
            router.push('/super-admin/roles-list'); // Redirect to roles list after update
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors.name ? error.response.data.errors.name[0] : 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <NavBar />
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
                                                        <h2 className="text-center">Edit Role</h2>
                                                        <a href="/super-admin/roles-list" className="btn btn-primary">Role List</a>
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
                                                                    placeholder="Role Name"
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    required
                                                                />
                                                                <label htmlFor="name">Role Name</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <h4>Permissions</h4>
                                                            <div className="row">
                                                                {permissions.map(permission => (
                                                                    <div key={permission.id} className="col-12 col-md-6">
                                                                        <div className="form-check">
                                                                            <input
                                                                                type="checkbox"
                                                                                id={`permission-${permission.id}`}
                                                                                value={permission.id}
                                                                                checked={selectedPermissions.includes(permission.id)}  // Preselect the checkbox if permission is selected
                                                                                onChange={handlePermissionChange}
                                                                                className="form-check-input"
                                                                            />
                                                                            <label htmlFor={`permission-${permission.id}`} className="form-check-label">
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
                                                                Update
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
