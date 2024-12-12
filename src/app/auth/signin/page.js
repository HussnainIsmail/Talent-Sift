'use client';

import React, { useState, useEffect } from 'react';
import axios from '../../../../lib/axios';
import '../../globals.css';
import NavBar from '@/sections/NavBar';
import { useRouter } from 'next/navigation';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');  
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      const response = await axios.post('/login', { email, password });
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('role', response.data.role); 
      localStorage.setItem('name', response.data.name); 
      localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
      alert('Login successful!');
      setLoading(false);
      const role = response.data.role;
       if (role === 'admin' || role === 'superadmin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className=''>
      <NavBar />
      <section className=" p-3 p-md-4 p-xl-5">
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
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="text-center mb-4">
                          <a href="#!" className="text-decoration-none text-black">
                            <img
                              src="/assets/img/bsb-logo.svg"
                              alt="TalentSift Logo"
                              width="175"
                              height="57"
                            />
                          </a>
                        </div>
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
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                              required
                            />
                            <label htmlFor="password">Password</label>
                          </div>
                          <div className="text-end mb-3">
                            <a
                              href="/forgot-password"
                              className="link-primary text-decoration-none"
                            >
                              Forgot Password?
                            </a>
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
                              'Login'
                            )}
                          </button>
                        </form>
                        <p className="mt-4 text-center">
                          Don't have an account?{' '}
                          <a
                            href="/signup"
                            className="link-primary text-decoration-none"
                          >
                            Sign Up
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
