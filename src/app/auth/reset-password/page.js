'use client'
import NavBar from '@/sections/NavBar';
import React from 'react';

export default function page() {

    return (
        <div>
            <NavBar />
            <div className='bg-light min-vh-100 d-flex justify-content-center pt-5'>
                <div className="row w-100 justify-content-center">
                    <div className="col-12 col-md-4">
                        <div className="card border-light-subtle shadow-sm p-4">
                            <h2 className="text-center my-2">Reset Your Password</h2>
                            <form >
                                <div className="row justify-content-center mx-2">
                                    <div className="col-12">
                                        {/* Password Input */}
                                        <div className="form-floating mb-3 mt-4">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Password"
                                                value=""
                                                required
                                            />
                                            <label htmlFor="password">New Password</label>
                                        </div>

                                        {/* Confirm Password Input */}
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                placeholder="Confirm Password"
                                                value=""
                                                required
                                            />
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                        </div>

                                        <div className="d-grid mt-3">
                                            <button type="submit" className="btn btn-primary rounded-pill py-2">
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
