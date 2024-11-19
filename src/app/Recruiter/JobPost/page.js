import NavBar from '@/sections/NavBar';
import React from 'react';

export default function Page() {
    return (
        <div>
            <NavBar />
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
                                                        <h2 className="h4 text-center mb-4">Job Details</h2>
                                                    </div>
                                                </div>
                                                <form>
                                                    <div className="row gy-3">
                                                        {/* Name Input */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-floating mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    name="name"
                                                                    className="form-control"
                                                                    placeholder="Name"
                                                                    required
                                                                />
                                                                <label htmlFor="name">Job Title</label>
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

                                                        {/* Description Textarea */}
                                                        <div className="col-12">
                                                            <div className="form-floating mb-3">
                                                                <textarea
                                                                    id="description"
                                                                    name="description"
                                                                    rows="5"
                                                                    className="form-control"
                                                                    placeholder="Description"
                                                                    required
                                                                ></textarea>
                                                                <label htmlFor="description">About the job</label>
                                                            </div>
                                                        </div>

                                                        {/* job type */}
                                                        <div className="col-12 col-md-6">
                                                            <label>Job type:</label>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="full-time" value="full-time" id="full-time" className="form-check-input" />
                                                                <label htmlFor="full-time" className="form-check-label">Full-Time</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="part-time" value="part-time" id="part-time" className="form-check-input" />
                                                                <label htmlFor="part-time" className="form-check-label">Part-Time</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="internship" value="Gaming" id="internship" className="form-check-input" />
                                                                <label htmlFor="internship" className="form-check-label">Internship</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="project-work" value="Cooking" id="project-work" className="form-check-input" />
                                                                <label htmlFor="project-work" className="form-check-label">Project Work</label>
                                                            </div>
                                                        </div>

                                                        {/* Work Location */}
                                                        <div className="col-12 col-md-6">
                                                            <label>Work Location:</label>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="full-time" value="full-time" id="full-time" className="form-check-input" />
                                                                <label htmlFor="full-time" className="form-check-label">Remote</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="part-time" value="part-time" id="part-time" className="form-check-input" />
                                                                <label htmlFor="part-time" className="form-check-label">On-site</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input type="checkbox" name="internship" value="Gaming" id="internship" className="form-check-input" />
                                                                <label htmlFor="internship" className="form-check-label">Hybrid</label>
                                                            </div>
                                                        </div>

                                                        {/* Subscribe Checkbox */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-check">
                                                                <input type="checkbox" id="subscribe" name="subscribe" className="form-check-input" />
                                                                <label htmlFor="subscribe" className="form-check-label">Subscribe to newsletter</label>
                                                            </div>
                                                        </div>

                                                        {/* Image Upload */}
                                                        <div className="col-12 col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="image" className="form-label">Upload Image:</label>
                                                                <input type="file" id="image" name="image" accept="image/*" className="form-control" />
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
    );
}
