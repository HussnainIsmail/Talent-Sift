import React from 'react';

export default function SideBar() {
    return (
        <div className="sidebar bg-light p-4 col-12 col-md-3 custom-hide-sm">
            <div className='d-flex justify-content-between'>
                <p className='fw-bold'>Job Type</p>
                <a className='text-danger text-decoration-none bg-transparent' href="#">Clear all</a>
            </div>
            <div>
                <form>
                    <div className='ps-2'>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="fullTime" />
                            <label className="form-check-label" htmlFor="fullTime">
                                Full-Time
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="partTime" />
                            <label className="form-check-label" htmlFor="partTime">
                                Part-Time
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="internship" />
                            <label className="form-check-label" htmlFor="internship">
                                Internship
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="projectWork" />
                            <label className="form-check-label" htmlFor="projectWork">
                                Project Work
                            </label>
                        </div>
                        {/* <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="volunteering" />
                            <label className="form-check-label" htmlFor="volunteering">
                                Volunteering
                            </label>
                        </div> */}
                    </div>
                </form>
            </div>

           
            {/* Experience Level Section */}
            <div>
                <div><p className='fw-bolder'>Experience Level</p></div>
                <form>
                    <div className='ps-2'>
                        <div className="form-check mb-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input" type="checkbox" id="entryLevel" />
                                <label className="form-check-label ms-2" htmlFor="entryLevel">
                                    Entry Level
                                </label>
                            </div>
                            <span className="text-muted">123</span>
                        </div>
                        <div className="form-check mb-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input" type="checkbox" id="midLevel" />
                                <label className="form-check-label ms-2" htmlFor="midLevel">
                                    Mid Level
                                </label>
                            </div>
                            <span className="text-muted">98</span>
                        </div>
                        <div className="form-check mb-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input" type="checkbox" id="seniorLevel" />
                                <label className="form-check-label ms-2" htmlFor="seniorLevel">
                                    Senior Level
                                </label>
                            </div>
                            <span className="text-muted">45</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
