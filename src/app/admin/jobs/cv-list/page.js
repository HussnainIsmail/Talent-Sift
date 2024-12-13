'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function JobApplicationsPage() {
    const [jobApplications, setJobApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        axios.get('http://127.0.0.1:8000/api/applications/list', {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in Authorization header
            }
        })
            .then((response) => {
                setJobApplications(response.data.job_applications);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => {
        alert(`Edit Job Application with ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete Job Application with ID: ${id}`);
    };

    const handleDownload = (filename) => {
        const url = `http://127.0.0.1:8000/storage/${filename}`;
        window.location.href = url; 
    };

    const toggleDropdown = (event, id) => {
        const dropdownMenu = document.getElementById(`dropdownMenu${id}`);
        if (dropdownMenu) {
            dropdownMenu.classList.toggle('show');
        }
        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !event.target.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="container mt-4" style={{ flexGrow: 1, overflowY: 'auto' }}>
                {loading && <div className="alert alert-info">Loading job applications...</div>}
                {error && <div className="alert alert-danger">Error: {error}</div>}

                <h1 className="mb-4 text-center">Job Applications</h1>
                <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ width: '100%', fontSize: '1.1rem' }}>
                        <thead className="table-dark">
                            <tr>
                                <th className="">First Name</th>
                                <th className="">Last Name</th>
                                <th className="">Email</th>
                                <th className="">Contact Number</th>
                                <th className="">CV</th>
                                <th className="">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobApplications.length > 0 ? (
                                jobApplications.map((application) => (
                                    <tr key={application.id}>
                                        <td className=" align-middle" style={{ height: '80px' }}>
                                            {application.first_name}
                                        </td>
                                        <td className=" align-middle" style={{ height: '80px' }}>
                                            {application.last_name}
                                        </td>
                                        <td className=" align-middle" style={{ height: '80px' }}>
                                            {application.email}
                                        </td>
                                        <td className=" align-middle" style={{ height: '80px' }}>
                                            {application.contact_no}
                                        </td>
                                        <td className=" align-middle" style={{ height: '80px' }}>
                                            {application.cv_path && (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleDownload(application.cv_path)}
                                                >
                                                    Download
                                                </button>
                                            )}
                                        </td>

                                        <td className="text-center align-middle" style={{ height: '80px' }}>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary btn-sm "
                                                    type="button"
                                                    onClick={(e) => toggleDropdown(e, application.id)}
                                                >
                                                    &#8942;
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    id={`dropdownMenu${application.id}`}
                                                    aria-labelledby={`dropdownMenuButton${application.id}`}
                                                    style={{ minWidth: '40px' }} // Reduced width of the dropdown
                                                >
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => handleEdit(application.id)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item text-danger"
                                                            onClick={() => handleDelete(application.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No job applications found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
