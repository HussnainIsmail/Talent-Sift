import React from 'react';

export default function SideBar({ filters, handleFilterChange }) {
    const jobTypeOptions = [
        { label: "Full-Time", value: "full-time" },
        { label: "Part-Time", value: "part-time" },
        { label: "Internship", value: "internship" },
        { label: "Project Work", value: "project-work" },
    ];

    const jobLevelOptions = [
        { label: "Entry", value: "entry" },
        { label: "Mid", value: "middle" },
        { label: "Expert", value: "expert" },
    ];

    return (
        <div className="sidebar bg-light p-4 col-12 col-md-3 custom-hide-sm">
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Job Type</p>
            </div>
            <div>
                <form>
                    <div className="ps-2">
                        {/* Job Type Filters */}
                        {jobTypeOptions.map(({ label, value }) => (
                            <div className="form-check mb-2" key={value}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={value}
                                    value={value}
                                    checked={filters.job_types.includes(value)}
                                    onChange={() => handleFilterChange('job_types', value)}
                                />
                                <label className="form-check-label" htmlFor={value}>
                                    {label}
                                </label>
                            </div>
                        ))}

                        {/* Job Level Filters */}
                        <div className="mt-4">
                            <p className="fw-bold">Job Level</p>
                            {jobLevelOptions.map(({ label, value }) => (
                                <div className="form-check mb-2" key={value}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={value}
                                        value={value}
                                        checked={filters.job_levels.includes(value)}
                                        onChange={() => handleFilterChange('job_levels', value)}
                                    />
                                    <label className="form-check-label" htmlFor={value}>
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
