'use client';

import React, { useState } from 'react';
import axios from '../../../../lib/axios';
import '../../globals.css';
import NavBar from '@/sections/NavBar';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/forgot-password', { email });

            Swal.fire({
                title: 'Success!',
                text: response.data.message || 'OTP sent to your email.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                router.push('/auth/verify-otp');

            });
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
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
                                    <div className="col-12 col-md-6">
                                        <img
                                            className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                                            loading="lazy"
                                            src="/assets/navbarmainimg.png"
                                            alt="Forgot your password?"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-lg-11 col-xl-10">
                                            <div className="card-body p-3 p-md-4 p-xl-5">
                                                <div className="text-center mb-4">
                                                    <a href="#!" className="text-decoration-none text-black">
                                                        <img
                                                            src="/assets/brandlogo.jpg"
                                                            alt="TalentSift Logo"
                                                            width="80"
                                                            height="50"
                                                        />
                                                    </a>
                                                </div>
                                                <h5 className="text-center mb-3">Forgot your password?</h5>
                                                <p className="text-center text-muted mb-4">
                                                    Enter your email to receive an OTP for password reset.
                                                </p>
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="name@example.com"
                                                            required
                                                        />
                                                        <label htmlFor="email">Email</label>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="btn btn-primary w-100"
                                                    >
                                                        {loading ? (
                                                            <div
                                                                className="spinner-border spinner-border-sm"
                                                                role="status"
                                                            >
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            'Send OTP'
                                                        )}
                                                    </button>
                                                </form>
                                                <p className="mt-4 text-center">
                                                    <a href="/auth/login" className="link-primary text-decoration-none">
                                                        Back to Login
                                                    </a>
                                                </p>
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
