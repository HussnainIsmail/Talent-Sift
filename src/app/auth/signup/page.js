'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavBar from '@/sections/NavBar';

export default function Page() {
  const [userType, setUserType] = useState(null); // To track whether candidate or employer is selected
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    companyName: '', // Only for employers
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
  
    if (formData.password !== formData.passwordConfirmation) {
      setErrors({ passwordConfirmation: "Passwords do not match." });
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        user_type: userType === 'candidate' ? 'user' : 'recuriter', // Sending as 'user' or 'recuriter'
        company_name: userType === 'employer' ? formData.companyName : null,
      });
  
      alert(response.data.message); // Show success message
      router.push('/auth/login'); // Redirect to sign-in page
    } catch (error) {
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
                      alt="Welcome!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="text-center mb-4">
                          <a href="#!" className="text-decoration-none">
                            <img
                              src="/assets/img/bsb-logo.svg"
                              alt="TalentSift Logo"
                              width="175"
                              height="57"
                            />
                          </a>
                        </div>

                        {!userType ? (
                          // User Selection Step
                          <div className="text-center">
                            <h4>Select Registration Type</h4>
                            <button className="btn btn-primary m-2" onClick={() => setUserType('candidate')}>
                              Register as Candidate
                            </button>
                            <button className="btn btn-secondary m-2" onClick={() => setUserType('employer')}>
                              Register as Employer
                            </button>
                          </div>
                        ) : (
                          // Registration Form
                          <form onSubmit={handleSubmit}>
                            <h4 className="mb-3">Register as {userType === 'candidate' ? "Candidate" : "Employer"}</h4>

                            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                            {/* Name Input */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder="Name"
                                  required
                                />
                                <label className="form-label">Name</label>
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                              </div>
                            </div>

                            {/* Email Input */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="Email"
                                  required
                                />
                                <label className="form-label">Email</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                              </div>
                            </div>

                            {/* Company Name Input (Only for Employers) */}
                            {userType === 'employer' && (
                              <div className="col-12">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    required
                                  />
                                  <label className="form-label">Company Name</label>
                                  {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                                </div>
                              </div>
                            )}

                            {/* Password Input */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  name="password"
                                  className="form-control"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  required
                                />
                                <label className="form-label">Password</label>
                              </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  name="passwordConfirmation"
                                  className="form-control"
                                  placeholder="Confirm Password"
                                  value={formData.passwordConfirmation}
                                  onChange={handleChange}
                                  required
                                />
                                <label className="form-label">Confirm Password</label>
                              </div>
                            </div>

                            <div className="col-12">
                              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Register"}
                              </button>
                            </div>
                          </form>
                        )}
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
