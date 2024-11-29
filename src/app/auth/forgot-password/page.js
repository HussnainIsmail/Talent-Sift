'use client'
import { useState } from 'react';
import NavBar from '@/sections/NavBar';
import '../globals.css';

export default function Page() {
    const [email, setEmail] = useState(''); 

    const handleChange = (e) => {
        setEmail(e.target.value); 
    };

    return (
        <div>
            <NavBar />
            <div className="bg-light min-vh-100 d-flex justify-content-center pt-5">
                <div className="row w-100 justify-content-center">
                    <div className="col-12 col-md-4">
                        <div className="card border-light-subtle shadow-sm p-4">
                            <h2 className="text-center my-2 fw-bold">Forgot Password</h2>
                            <form>
                                <div className="row justify-content-center mx-2">
                                    <div className="col-12">
                                        {/* Email Input */}
                                        <div className="form-floating mb-3 mt-4">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email or Phone"
                                                value={email} // Controlled input
                                                onChange={handleChange} // Update state on change
                                                required
                                            />
                                            <label htmlFor="email">Email or Phone</label>
                                        </div>
                                        <p className="small-text fw-normal">
                                            We’ll send a verification code to this email or phone number if it matches an existing LinkedIn account.
                                        </p>
                                        <div className="d-grid mt-3">
                                            <button type="submit" className="btn btn-primary rounded-pill py-2">
                                                Send Reset Link
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
