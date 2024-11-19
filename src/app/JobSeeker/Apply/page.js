import NavBar from '@/sections/NavBar'
import React from 'react'

export default function page() {
    return (
        <div>
            <NavBar/>
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card border-light-subtle shadow-sm">
                                <div className="row g-0">
                                    <div className="col-12  d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-lg-11 col-xl-10">
                                            <div className="card-body p-3 p-md-4 p-xl-5">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h2 className="h4 text-center mb-4">Apply For job</h2>
                                                    </div>
                                                </div>
                                                <form>
                                                    <div className="row gy-3">
                                                        {/* First Name Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="first-name"
                                                                    name="first-name"
                                                                    className="form-control"
                                                                    placeholder="First Name"
                                                                    required
                                                                />
                                                                <label htmlFor="first-name">First Name</label>
                                                            </div>
                                                        </div>

                                                        {/* Last Name Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="last-name"
                                                                    name="last-name"
                                                                    className="form-control"
                                                                    placeholder="Last Name"
                                                                    required
                                                                />
                                                                <label htmlFor="last-name">Last Name</label>
                                                            </div>
                                                        </div>

                                                        {/* Email Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    required
                                                                />
                                                                <label htmlFor="email">Email</label>
                                                            </div>
                                                        </div>

                                                        {/* Contact No Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="tel"
                                                                    id="contact-no"
                                                                    name="contact-no"
                                                                    className="form-control"
                                                                    placeholder="Contact No"
                                                                    required
                                                                />
                                                                <label htmlFor="contact-no">Contact No</label>
                                                            </div>
                                                        </div>

                                                        {/* CV Document Upload */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="cv" className="form-label">Upload CV:</label>
                                                                <input
                                                                    type="file"
                                                                    id="cv"
                                                                    name="cv"
                                                                    accept=".pdf,.doc,.docx"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="col-12 d-flex justify-content-center mt-4">
                                                            <button type="submit" className="btn btn-dark btn-lg">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>

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
    )
}
