'use client';

import React, { useState } from 'react';
import axios from '../../../../lib/axios';
import NavBar from '@/sections/NavBar';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function VerifyOtpPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('/verify-otp', { email, otp });
            Swal.fire({
                title: 'Verified!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                localStorage.setItem('reset_email', email); // store email for next step
                router.push('/auth/reset-password');
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong.');
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
                        <div className="col-12 col-md-6">
                            <div className="card p-4 shadow-sm">
                                <h3 className="mb-3 text-center">Verify OTP</h3>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label>Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                        <label>OTP</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? 'Verifying...' : 'Verify OTP'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
