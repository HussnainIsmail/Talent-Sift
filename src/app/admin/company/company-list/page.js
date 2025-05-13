'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/companies', {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCompanies(response.data.data); 
            } catch (error) {
                console.error('Error fetching companies:', error);
                setError('Failed to load companies.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanies();
    }, [token]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }
    if (error) {
        return (
            <div>{error}</div>
        );
    }

    return (
        <div>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card-body">
                                <h1>Your Companies</h1>

                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Company Name</th>
                                                <th>Contact Number</th>
                                                <th>Email</th>
                                                <th>Foundation Date</th>
                                                <th>Location</th>
                                                {/* <th>Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companies.map((company, index) => (
                                                <tr key={company.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{company.company_name}</td>
                                                    <td>{company.contact_no}</td>
                                                    <td>{company.company_email}</td>
                                                    <td>{company.company_foundation_date}</td>
                                                    <td>{company.company_location}</td>
                                                    {/* <td>
                                                        <button
                                                            className="btn btn-sm btn-primary me-2"
                                                            onClick={() => router.push(`/company/${company.id}`)}
                                                        >
                                                            View
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
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
