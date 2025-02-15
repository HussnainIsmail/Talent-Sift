// import React from 'react';

// export default function SideBar({ filters, handleFilterChange }) {
//     return (
//         <div className="sidebar bg-light p-4 col-12 col-md-3 custom-hide-sm">
//             <div className='d-flex justify-content-between'>
//                 <p className='fw-bold'>Job Type</p>
//             </div>
//             <div>
//                 <form>
//                     <div className='ps-2'>
//                         {/* Job Type Filters */}
//                         <div className="form-check mb-2">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="full-time"
//                                 value="full-time"
//                                 checked={filters.includes("full-time")}
//                                 onChange={handleFilterChange}
//                             />
//                             <label className="form-check-label" htmlFor="fullTime">
//                                 Full-Time
//                             </label>
//                         </div>
//                         <div className="form-check mb-2">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="partTime"
//                                 value="part-time"
//                                 checked={filters.includes("part-time")}
//                                 onChange={handleFilterChange}
//                             />
//                             <label className="form-check-label" htmlFor="partTime">
//                                 Part-Time
//                             </label>
//                         </div>
//                         <div className="form-check mb-2">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="internship"
//                                 value="internship"
//                                 checked={filters.includes("internship")}
//                                 onChange={handleFilterChange}
//                             />
//                             <label className="form-check-label" htmlFor="internship">
//                                 Internship
//                             </label>
//                         </div>
//                         <div className="form-check mb-2">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="projectWork"
//                                 value="projectWork"
//                                 checked={filters.includes("projectWork")}
//                                 onChange={handleFilterChange}
//                             />
//                             <label className="form-check-label" htmlFor="projectWork">
//                                 Project Work
//                             </label>
//                         </div>

//                         {/* Job Level Filters */}
//                         <div className="mt-4">
//                             <p className='fw-bold'>Job Level</p>
//                             <div className="form-check mb-2">
//                                 <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     id="entryLevel"
//                                     value="entry-level"
//                                     checked={filters.includes("entry-level")}
//                                     onChange={handleFilterChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="entryLevel">
//                                     Entry
//                                 </label>
//                             </div>
//                             <div className="form-check mb-2">
//                                 <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     id="midLevel"
//                                     value="mid-level"
//                                     checked={filters.includes("mid-level")}
//                                     onChange={handleFilterChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="midLevel">
//                                     Mid
//                                 </label>
//                             </div>
//                             <div className="form-check mb-2">
//                                 <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     id="expertLevel"
//                                     value="expert-level"
//                                     checked={filters.includes("expert-level")}
//                                     onChange={handleFilterChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="expertLevel">
//                                     Expert
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
