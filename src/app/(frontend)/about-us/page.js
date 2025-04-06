'use client';
import React from 'react';

export default function AboutUs() {
    return (
        <section className="bg-light p-4 p-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="h3 text-center mb-4">About Us</h2>
                                <p className="mb-3">
                                    Welcome to our platform! We're on a mission to connect job seekers with the right opportunities and employers with the right talent. Our aim is to simplify the hiring process through a seamless and efficient platform.
                                </p>
                                <p className="mb-3">
                                    Founded in 2025, we’ve grown into a reliable solution trusted by companies and candidates alike. With cutting-edge tools, real-time updates, and a commitment to innovation, we're shaping the future of recruitment.
                                </p>
                                <p className="mb-3">
                                    Whether you’re a job seeker looking for the perfect role, or a company in search of great talent — we’re here to support you every step of the way.
                                </p>
                                <h5 className="mt-4">Our Values</h5>
                                <ul>
                                    <li>Transparency and trust</li>
                                    <li>Innovation and efficiency</li>
                                    <li>User-first experience</li>
                                    <li>Inclusivity and diversity</li>
                                </ul>
                                <p className="mt-4">
                                    Thank you for being a part of our journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
