'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import NavBar from '@/sections/NavBar';

export default function RegisterPage() {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    companyName: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'email' && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
    }

    if (name === 'password' && !validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.',
      }));
    }

    if (name === 'passwordConfirmation' && value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirmation: 'Passwords do not match.',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
  
    // Validate on submit
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      setIsSubmitting(false);
      return;
    }
  
    if (!validatePassword(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.',
      }));
      setIsSubmitting(false);
      return;
    }
  
    if (formData.password !== formData.passwordConfirmation) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirmation: 'Passwords do not match.',
      }));
      setIsSubmitting(false);
      return;
    }
  
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        user_type: userType,
      };
  
      if (userType === 'recuriter') {
        payload.company_name = formData.companyName;
      }
  
      // Log the payload to the console
      console.log('Sending payload to API:', payload);
  
      await axios.post('http://127.0.0.1:8000/api/register', payload);
  
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You have registered successfully.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
      }).then(() => {
        router.push('/auth/login');
      });
  
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      const firstError = error.response?.data?.errors
        ? Object.values(error.response.data.errors)[0][0]
        : 'An unexpected error occurred.';
  
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: firstError,
      });
  
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
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
                      alt="Welcome"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="text-center mb-4">
                          <a href="#" className="text-decoration-none">
                            <img src="/assets/img/bsb-logo.svg" alt="Logo" width="175" height="57" />
                          </a>
                        </div>

                        {!userType ? (
                          <div className="text-center">
                            <h4>Select Registration Type</h4>
                            <button className="btn btn-primary m-2" onClick={() => setUserType('candidate')}>
  Register as Candidate
</button>
<button className="btn btn-secondary m-2" onClick={() => setUserType('recuriter')}>
  Register as Employer
</button>

                          </div>
                        ) : (
                          <form onSubmit={handleSubmit}>
                            <h4 className="mb-3">Register as {userType === 'candidate' ? 'Candidate' : 'Recuriter'}</h4>

                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Name"
                                required
                              />
                              <label>Name</label>
                              {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>

                            <div className="form-floating mb-3">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email"
                                required
                              />
                              <label>Email</label>
                              {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>

                            {userType === 'recuriter' && (
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
                                <label>Company Name</label>
                                {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                              </div>
                            )}

                            <div className="form-floating mb-3 position-relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              />
                              <label>Password</label>
                              <small className="text-muted">
                                At least 8 characters with upper, lower, number, and special character.
                              </small>
                              {errors.password && <div className="text-danger">{errors.password}</div>}
                              <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                  position: 'absolute',
                                  top: '38%',
                                  right: '10px',
                                  cursor: 'pointer',
                                }}
                              >
                                {showPassword ? '👁️‍🗨️' : '🙈'}
                              </span>
                            </div>

                            <div className="form-floating mb-3 position-relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="passwordConfirmation"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={formData.passwordConfirmation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              />
                              <label>Confirm Password</label>
                              {errors.passwordConfirmation && (
                                <div className="text-danger">{errors.passwordConfirmation}</div>
                              )}
                              <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                  position: 'absolute',
                                  top: '38%',
                                  right: '10px',
                                  cursor: 'pointer',
                                }}
                              >
                                {showConfirmPassword ? '👁️‍🗨️' : '🙈'}
                              </span>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                              {isSubmitting ? 'Submitting...' : 'Register'}
                            </button>
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
