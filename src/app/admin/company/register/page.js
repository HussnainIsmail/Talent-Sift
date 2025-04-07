'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [formData, setFormData] = useState({
        company: '',
        contactNo: '',
        companyEmail: '',
        foundationDate: '',
        services: '',
        location: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const router = useRouter();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (!token) {
            setErrors({ general: "User not authenticated." });
            return;
        }

        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/companies', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCompanies(response.data.data);
            setFilteredCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            setErrors({ general: 'Failed to load companies.' });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setFormData({ ...formData, company: inputValue });

        const filtered = companies.filter((company) =>
            company.company_name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCompanies(filtered);
        setDropdownVisible(true);
    };

    const handleCompanySelect = (companyName) => {
        setFormData({ ...formData, company: companyName });
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const servicesArray = formData.services.split(',').map(service => service.trim());
        if (servicesArray.length < 5) {
            setErrors({ services: "At least 5 services are required, separated by commas." });
            setIsSubmitting(false);
            return;
        }

        const dataToSend = {
            companyName: formData.company,
            contactNo: formData.contactNo,
            companyEmail: formData.companyEmail,
            foundationDate: formData.foundationDate,
            services: servicesArray,
            location: formData.location,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/companies/store', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message);
            router.push('/admin/resume/resume-list');
        } catch (error) {
            console.error('Company Registration Failed:', error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "An error occurred, please try again." });
            }
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card border-light-subtle shadow-sm">
                                <div className="row g-0">
                                    <div className="col-12 d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-lg-11 col-xl-10">
                                            <div className="card-body p-3 p-md-4 p-xl-5">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h2 className="h4 text-center mb-4">Register Your Company</h2>
                                                    </div>
                                                </div>

                                                {errors.general && (
                                                    <div className="alert alert-danger">{errors.general}</div>
                                                )}

                                                <form onSubmit={handleSubmit}>
                                                    <div className="row gy-3">

                                                        {/* Company Name with Dropdown */}
                                                        <div className="col-12 col-md-6 position-relative">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="company"
                                                                    name="company"
                                                                    className="form-control"
                                                                    placeholder="Company Name"
                                                                    value={formData.company}
                                                                    onChange={handleInputChange}
                                                                    onFocus={toggleDropdown}
                                                                    autoComplete="off"
                                                                    required
                                                                />
                                                                <label htmlFor="company">Company Name</label>
                                                            </div>

                                                            {dropdownVisible && filteredCompanies.length > 0 && (
                                                                <ul className="dropdown-menu show w-100" style={{ position: 'absolute', top: '100%', zIndex: 1000 }}>
                                                                    {filteredCompanies.map((company, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className="dropdown-item"
                                                                            onClick={() => handleCompanySelect(company.company_name)}
                                                                            style={{ cursor: 'pointer' }}
                                                                        >
                                                                            {company.company_name}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>

                                                        {/* Contact Number */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="tel"
                                                                    id="contactNo"
                                                                    name="contactNo"
                                                                    className="form-control"
                                                                    placeholder="Contact Number"
                                                                    value={formData.contactNo}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="contactNo">Contact Number</label>
                                                            </div>
                                                        </div>

                                                        {/* Company Email */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="email"
                                                                    id="companyEmail"
                                                                    name="companyEmail"
                                                                    className="form-control"
                                                                    placeholder="Company Email"
                                                                    value={formData.companyEmail}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="companyEmail">Company Email</label>
                                                            </div>
                                                        </div>

                                                        {/* Foundation Date */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="date"
                                                                    id="foundationDate"
                                                                    name="foundationDate"
                                                                    className="form-control"
                                                                    placeholder="Foundation Date"
                                                                    value={formData.foundationDate}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="foundationDate">Foundation Date</label>
                                                            </div>
                                                        </div>

                                                        {/* Services */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="services"
                                                                    name="services"
                                                                    className="form-control"
                                                                    placeholder="Services"
                                                                    value={formData.services}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="services">Services (Comma Separated)</label>
                                                                {errors.services && <div className="text-danger">{errors.services}</div>}
                                                            </div>
                                                        </div>

                                                        {/* Location */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="location"
                                                                    name="location"
                                                                    className="form-control"
                                                                    placeholder="Location"
                                                                    value={formData.location}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                                <label htmlFor="location">Location</label>
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="col-12 text-center">
                                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                                {isSubmitting ? 'Registering...' : 'Register Company'}
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
