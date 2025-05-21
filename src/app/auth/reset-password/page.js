'use client';

import React, { useState } from 'react';
import axios from '../../../../lib/axios';
import NavBar from '@/sections/NavBar';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // Install Lucide or use another icon lib

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const email = typeof window !== 'undefined' ? localStorage.getItem('reset_email') : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('/reset-password', { email, password });
            Swal.fire({
                title: 'Success!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                localStorage.removeItem('reset_email');
                router.push('/auth/login');
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="bg-light min-vh-100 d-flex justify-content-center pt-5">
                <div className="row w-100 justify-content-center">
                    <div className="col-12 col-md-4">
                        <div className="card shadow-sm p-4">
                            <h2 className="text-center mb-3">Reset Your Password</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3 position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label>New Password</label>
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>

                                <div className="form-floating mb-3 position-relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <label>Confirm Password</label>
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
