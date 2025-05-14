'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function JobApplicationsPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('jobId');
    const [jobApplications, setJobApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token not found. Please log in again.');
            return;
        }
    
        if (!id) {
            Swal.fire({
                icon: 'info',
                title: 'No Job Posted',
                text: 'Post a job first to view applications!',
                confirmButtonText: 'Go to Post Job',
            }).then(() => {
                router.push('/admin/jobs/create-job');
            });
            return;
        }
    
        axios.get(`http://127.0.0.1:8000/api/jobs/${id}/applications`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const { job_applications } = response.data;
            setJobApplications(job_applications);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setError('Failed to fetch job applications.');
            setLoading(false);
        });
    }, [id, router]);
    
    const handleReject = (applicationId) => {
        Swal.fire({
            title: 'Reject Application?',
            text: "Are you sure you want to reject this application?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Add your rejection logic here
                Swal.fire(
                    'Rejected!',
                    'The application has been rejected.',
                    'success'
                );
            }
        });
    };

    const handleSendEmail = (applicationId) => {
        router.push(`/admin/resume/email?applicationId=${applicationId}`);
    };

    const handleDownload = (filename) => {
        const url = `http://127.0.0.1:8000/storage/cvs/${filename}`;
        window.location.href = url;
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
                                <th className='align-middle'>First Name</th>
                                <th className='align-middle'>Last Name</th>
                                <th className='align-middle'>Email</th>
                                <th className='align-middle'>Contact Number</th>
                                <th className='align-middle'>CV</th>
                                <th className='align-middle'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobApplications.length > 0 ? (
                                jobApplications.map((application) => (
                                    <tr key={application.id}>
                                        <td className="align-middle">{application.first_name}</td>
                                        <td className="align-middle">{application.last_name}</td>
                                        <td className="align-middle">{application.email}</td>
                                        <td className="align-middle">{application.contact_no}</td>
                                       <td className="align-middle">
                                            {application.cv_path && (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleDownload(application.cv_path)}
                                                >
                                                    Download
                                                </button>
                                            )}
                                        </td>
                                        <td className="text-center align-middle">
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleSendEmail(application.id)}
                                            >
                                                Send Email
                                            </button>
                                            {/* <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleReject(application.id)}
                                            >
                                                Reject
                                            </button> */}
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