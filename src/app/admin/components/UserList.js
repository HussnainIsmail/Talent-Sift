'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Fetch users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            setUsers(response.data.users); 
            setError('');
        } catch (error) {
            setError('Failed to fetch users.');
        }
    };


    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/users/${id}`); 
                setSuccessMessage(response.data.message);
                setError('');
            } catch (error) {
                setSuccessMessage('');
                setError(
                    error.response?.data?.message || 'Failed to delete user.'
                );
            }
        }
    };

    // Edit a user
    const handleEdit = (id) => {
        router.push(`/users/edit?id=${id}`);
    };

    return (
        <div>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h1 className="text-center">User List</h1>
                                        <a href="/super-admin/user-create" className="btn btn-primary">Create User</a>
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
                                                    <th>Username</th>
                                                    <th>Role</th>
                                                    <th>Email</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.length > 0 ? (
                                                    users.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.role}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-sm btn-primary me-2"
                                                                    onClick={() => handleEdit(user.id)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => handleDelete(user.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">
                                                            No users found.
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
