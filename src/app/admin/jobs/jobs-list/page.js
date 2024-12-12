'use client'
import React, { useEffect, useState } from "react";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [authJobs, setAuthJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/jobs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs.");
        }

        const data = await response.json();
        setJobs(data.jobs); // All jobs
        setAuthJobs(data.authjobs); // Authenticated user's jobs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card-body">
                <h1>Your Jobs</h1>
                {authJobs.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Job Title</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {authJobs.map((job, index) => (
                          <tr key={job.id}>
                            <td>{index + 1}</td>
                            <td>{job.jobtitle}</td>
                            <td>{job.description}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() => handleEdit(job.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(job.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>You have no jobs posted.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}