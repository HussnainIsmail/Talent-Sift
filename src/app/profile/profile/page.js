'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../../app/{frontend}/sections/NavBar'
// import NavBar from '../{frontend}/sections/NavBar';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // Use proper naming for the hook

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated.');
        router.push('auth/login'); // Redirect to login page
        return;
      }

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setProfile(response.data.profile);
      } catch (err) {
        setError('Failed to fetch user info. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleUpdateProfileClick = () => {
    router.push(`profile/editprofile/${user.id}`);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!user) return <div className="alert alert-warning mt-5">No user data available.</div>;

  return (
    <div>
    <NavBar/>
      <div className="container mt-5">
        <div className="row">
          {/* Main Profile Section */}
          <div className="col-md-8">
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div>
                    <div
                      className="profile-avatar bg-light rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 100, height: 100 }}
                      aria-label="User profile picture"
                    >
                      <span style={{ fontSize: '2rem' }}>{user.name?.charAt(0) || '?'}</span>
                    </div>
                  </div>
                  <div className="ms-3">
                    <h5 className="mb-1">{user.name}</h5>
                    <p className="text-muted mb-1">{profile?.profession || 'Profession not set'}</p>
                    <p className="text-muted">{profile?.address || 'Location not available'}</p>
                  </div>
                </div>

                {/* Connections and Contact Info */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <strong>{user.connections || 0}</strong> connections
                  </div>
                  <a href={`mailto:${user.email}`} className="btn btn-outline-primary btn-sm">
                    Contact Info
                  </a>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary w-50">Open to</button>
                  <button
                    className="btn btn-outline-primary w-50"
                    onClick={handleUpdateProfileClick}
                  >
                    Update profile
                  </button>
                  <button className="btn btn-outline-primary w-50">Enhance profile</button>
                </div>

                <hr className="my-4" />
                <div className="d-flex justify-content-between">
                  <div className="text-muted">
                    <strong>{profile?.company || 'Company not set'}</strong>
                  </div>
                  <div className="text-muted">
                    <strong>{profile?.university || 'University not set'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            <div className="card shadow mb-4">
              <div className="card-body">
                <h6>Public profile & URL</h6>
                <a
                  href={`https://${profile?.profileLink || '#'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary small"
                  aria-label="Profile link"
                >
                  {profile?.profileLink || 'Profile link not set'}
                </a>
              </div>
            </div>

            <div className="card shadow">
              <div className="card-body">
                <h6>Suggested for you</h6>
                <p className="text-muted small">
                  Enhance your profile with the help of AI. Stand out for almost 2x as many
                  opportunities with a stronger profile.
                </p>
                <button className="btn btn-outline-primary w-100">Enhance Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
