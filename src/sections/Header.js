'use client';
import React, { useState } from 'react';
import '../app/globals.css';
export default function Header() {
  const [salaryRange, setSalaryRange] = useState(0);
  const [maxSalary, setMaxSalary] = useState(10000);

  const handleSalaryChange = (e) => {
    setSalaryRange(e.target.value);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div className='bg-black cus-border-bottom pb-1'>
        <div className="row g-3 pt-4  px-2 mx-0">

          <div className="col-md">
          <div className="input-group border-end">
            <span
              className="input-group-text bg-transparent border-1 p-1 d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#333"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-white "
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <select
              className="form-select bg-transparent border-0 text-white custom-select"
              style={{
                boxShadow: "none",
                outline: "none",
                color: "white",
                appearance: "none", 
                backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"white\" class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14l-4.796-5.481C1.825 5.37 2.12 5 2.669 5h10.662c.548 0 .843.37.417.659l-4.796 5.482a.5.5 0 0 1-.708 0z\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                paddingRight: "30px"
              }}
            >
              <option value="">Designer</option>
              <option value="ui">UI Designer</option>
              <option value="ux">UX Designer</option>
              <option value="product">Product Designer</option>
            </select>
          </div>


        </div>

          {/* Work Location Dropdown */}
          <div className="col-md">
          <div className="input-group border-end">
            <span
              className="input-group-text bg-transparent border-1 p-1 d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#333"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='text-white'>
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              </svg>
            </span>
            <select
              className="form-select bg-transparent border-0 text-white"
              style={{
                boxShadow: "none",
                outline: "none",
                color: "white",
                appearance: "none", // Hide default arrow
                backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"white\" class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14l-4.796-5.481C1.825 5.37 2.12 5 2.669 5h10.662c.548 0 .843.37.417.659l-4.796 5.482a.5.5 0 0 1-.708 0z\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                paddingRight: "30px"
              }}
            >
              <option value="">Work location</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

          {/* Experience Dropdown */}
          <div className="col-md">
          <div className="input-group border-end">
            <span
              className="input-group-text bg-transparent border-1 p-1 d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#333"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='text-white'>
                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
              </svg>
            </span>
            <select
              className="form-select bg-transparent border-0 text-white"
              style={{
                boxShadow: "none",
                outline: "none",
                color: "white",
                appearance: "none", // Hide default arrow
                backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"white\" class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14l-4.796-5.481C1.825 5.37 2.12 5 2.669 5h10.662c.548 0 .843.37.417.659l-4.796 5.482a.5.5 0 0 1-.708 0z\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                paddingRight: "30px"
              }}
            >
              <option value="">Experience</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
        </div>


          {/* Per Month Dropdown */}
          <div className="col-md">
          <div className="input-group border-end">
            <span
              className="input-group-text bg-transparent border-1 p-1 d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#333"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='text-white'>
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
              </svg>
            </span>
            <select
              className="form-select bg-transparent border-0 text-white "
              style={{
                boxShadow: "none",
                outline: "none",
                color: "white",
                appearance: "none", // Hide default arrow
                backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"white\" class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14l-4.796-5.481C1.825 5.37 2.12 5 2.669 5h10.662c.548 0 .843.37.417.659l-4.796 5.482a.5.5 0 0 1-.708 0z\"/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                paddingRight: "30px"
              }}
            >
              <option value="" className='text-white'>Per month</option>
              <option value="hourly">Hourly</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

          {/* Salary Range */}
          <div className="col-md">
          <div className="px-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-white" style={{ fontSize: '0.8rem' }}>Salary range</span>
              <span className="text-white" style={{ fontSize: '0.8rem' }}>${salaryRange} - ${maxSalary}</span>
            </div>
            <input
              type="range"
              className="form-range"
              min="1200"
              max={maxSalary}
              value={salaryRange}
              onChange={handleSalaryChange}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
