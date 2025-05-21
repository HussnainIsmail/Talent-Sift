'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EnhanceProfile() {
    const [formData, setFormData] = useState({
        enhance_profile_profession: '',
        enhance_profile_skills: '',
        enhance_profile_experience: '',
    });
    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({});

    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Get ID from URL
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoadingProfile(false);
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/user/enhance-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.profile) {
                    setFormData({
                        enhance_profile_profession: response.data.profile.enhance_profile_profession || '',
                        enhance_profile_skills: response.data.profile.enhance_profile_skills || '',
                        enhance_profile_experience: response.data.profile.enhance_profile_experience || '',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setErrors({});

        try {
            const token = localStorage.getItem('token');

            const formDataToSend = {
                id: id, // Send the ID with the request
                enhance_profile_profession: formData.enhance_profile_profession,
                enhance_profile_skills: formData.enhance_profile_skills,
                enhance_profile_experience: formData.enhance_profile_experience,
            };

            const response = await axios.post(
                'http://127.0.0.1:8000/api/user/enhance-profile',
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(response.data.message);
            router.push('/user-profile');
        } catch (error) {
            console.error('Enhance Profile Failed:', error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred, please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    if (loadingProfile) {
        return <div>Loading profile data...</div>;
    }

    return (
        <div className="container mt-5">
            <h3>Enhance Your Profile</h3>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Profession Title</label>
                    <input
                        type="text"
                        className={`form-control ${errors.enhance_profile_profession ? 'is-invalid' : ''}`}
                        name="enhance_profile_profession"
                        value={formData.enhance_profile_profession}
                        onChange={handleChange}
                        required
                    />
                    {errors.enhance_profile_profession && (
                        <div className="invalid-feedback">{errors.enhance_profile_profession[0]}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Skills (comma-separated)</label>
                    <input
                        type="text"
                        className={`form-control ${errors.enhance_profile_skills ? 'is-invalid' : ''}`}
                        name="enhance_profile_skills"
                        value={formData.enhance_profile_skills}
                        onChange={handleChange}
                        placeholder="e.g. React, Laravel, Node.js"
                        required
                    />
                    {errors.enhance_profile_skills && (
                        <div className="invalid-feedback">{errors.enhance_profile_skills[0]}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Experience</label>
                    <input
                        type="text"
                        className={`form-control ${errors.enhance_profile_experience ? 'is-invalid' : ''}`}
                        name="enhance_profile_experience"
                        value={formData.enhance_profile_experience}
                        onChange={handleChange}
                        required
                    />
                    {errors.enhance_profile_experience && (
                        <div className="invalid-feedback">{errors.enhance_profile_experience[0]}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Saving...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
