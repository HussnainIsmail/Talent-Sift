'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function EditProfile() {
  const [profile, setProfile] = useState({
    profession: '',
    address: '',
    degrees: [''],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleDegreeChange = (index, value) => {
    const updatedDegrees = [...profile.degrees];
    updatedDegrees[index] = value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      degrees: updatedDegrees,
    }));
  };

  const addDegree = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      degrees: [...prevProfile.degrees, ''],
    }));
  };

  const removeDegree = (index) => {
    const updatedDegrees = profile.degrees.filter((_, i) => i !== index);
    setProfile((prevProfile) => ({
      ...prevProfile,
      degrees: updatedDegrees,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/update-profile',
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Update Profile</h3>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="profession" className="form-label">
            Profession
          </label>
          <input
            type="text"
            className="form-control"
            id="profession"
            name="profession"
            value={profile.profession}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Degrees</label>
          {profile.degrees.map((degree, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                placeholder={`Degree ${index + 1}`}
                value={degree}
                onChange={(e) => handleDegreeChange(index, e.target.value)}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeDegree(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={addDegree}>
            Add Degree
          </button>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
