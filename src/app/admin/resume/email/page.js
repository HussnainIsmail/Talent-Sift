'use client';
import React, { useState, useEffect } from 'react'; 
import DatePicker from 'react-datepicker';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';

const InterviewScheduler = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('jobId');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [interviewType, setInterviewType] = useState('Online');
    const [employeeName, setEmployeeName] = useState('');
    const [jobName, setJobName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyContact, setCompanyContact] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDateTime = (date) => {
        return format(date, 'EEEE, MMMM d, yyyy h:mm a');
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleInterviewTypeChange = (e) => {
        setInterviewType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            alert('Token not found. Please log in again.');
            return;
        }

        const formattedDateTime = formatDateTime(selectedDate);

        axios.post(
            `http://127.0.0.1:8000/api/send/intervie-email/${id}`,
            {
                interviewType,
                scheduledDate: formattedDateTime,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            alert('Interview confirmed successfully!');
        })
        .catch((error) => {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container mt-5">
                <div className="card shadow-lg p-5 border-0">
                    <h2 className="text-center mb-4 text-primary font-weight-bold">Interview Scheduling</h2>

                    <p className="text-center mb-4">
                        Dear <strong>{employeeName}</strong>,
                        <br />
                        We are excited to inform you that your application for the <strong>{jobName}</strong> position at <strong>{companyName}</strong> has advanced to the next stage. We would like to schedule an interview with you.
                        <br />
                        Below are the details of your interview:
                    </p>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="interviewType" className="form-label font-weight-semibold">
                                    Select Interview Type:
                                </label>
                                <select
                                    id="interviewType"
                                    className="form-control"
                                    value={interviewType}
                                    onChange={handleInterviewTypeChange}
                                    aria-label="Select interview type"
                                >
                                    <option value="Online">Online</option>
                                    <option value="In-office">In-office</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="datepicker" className="form-label font-weight-semibold">
                                    Select Date & Time:
                                </label>
                                <DatePicker
                                    id="datepicker"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    timeIntervals={15}
                                    minDate={new Date()}
                                    timeCaption="Time"
                                    withPortal
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        {interviewType === 'Online' ? (
                            <p>
                                <strong>Interview Type:</strong> Online
                                <br />
                                We will send you a link for the online interview closer to the scheduled time.
                            </p>
                        ) : (
                            <p>
                                <strong>Interview Type:</strong> In-office
                                <br />
                                <strong>Location:</strong> {companyLocation}
                                <br />
                                <strong>Address:</strong> {companyAddress}
                            </p>
                        )}
                    </div>

                    <div className="text-center mb-4">
                        <strong>Contact Number:</strong> {companyContact} (For any inquiries or rescheduling)
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary px-4 py-2">Confirm Interview</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default InterviewScheduler;
