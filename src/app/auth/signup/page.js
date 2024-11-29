
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavBar from '@/sections/NavBar'

// tetsing git
export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    iAgree: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      iAgree: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    if (formData.password !== formData.passwordConfirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirmation: "Passwords do not match.",
      }));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      });

      // Show success message
      alert(response.data.message); // Or use a toast library for better UX
      router.push('/auth/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred, please try again." });
      }
    }

    setIsSubmitting(false);
  };


  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <NavBar />
      <section className="bg-light p-3 p-md-4 p-xl-5">
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
                        {/* Logo Section */}
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

                        <form onSubmit={handleSubmit}>
                          <div className="row gy-3">
                            {errors.general && (
                              <div className="col-12">
                                <div className="alert alert-danger">{errors.general}</div>
                              </div>
                            )}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder="Name"
                                  required
                                />
                                <label htmlFor="name" className="form-label">Name</label>
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="Email"
                                  required
                                />
                                <label htmlFor="email" className="form-label">Email</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                              </div>
                            </div>

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
                                <label htmlFor="password" className="form-label">Password</label>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                              </div>
                            </div>

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
                                <label htmlFor="passwordConfirmation" className="form-label">
                                  Confirm Password
                                </label>
                                {errors.passwordConfirmation && (
                                  <div className="text-danger">{errors.passwordConfirmation}</div>
                                )}
                              </div>
                            </div>

                            <div className="col-12 form-check">
                              <input
                                type="checkbox"
                                name="iAgree"
                                className="form-check-input"
                                checked={formData.iAgree}
                                onChange={handleCheckboxChange}
                                required
                              />
                              <label className="form-check-label ms-2">
                                I agree to the terms and conditions
                              </label>
                            </div>

                            <div className="col-12">
                              <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Submitting..." : "Register"}
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* Already have an account */}
                        <p className="mt-4 text-center">
                          Already have an account?{" "}
                          <a href="/login" className="link-primary text-decoration-none">
                            Log In
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
