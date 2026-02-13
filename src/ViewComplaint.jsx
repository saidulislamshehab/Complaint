import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewComplaint = () => {
    const [complaints] = useState(() => {
        const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        return storedComplaints.reverse();
    });

    return (
        <div className="container">
            <nav className="nav">
                <Link to="/">Submit Complaint</Link>
                <Link to="/complaints" className="active">View Complaints</Link>
            </nav>
            
            <div className="card" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
                <h1>Submitted Complaints</h1>
                
                {complaints.length === 0 ? (
                    <div className="empty-state">
                        <h2>No complaints yet</h2>
                        <p>Be the first to submit a complaint using the form above.</p>
                    </div>
                ) : (
                    complaints.map((complaint) => (
                        <div key={complaint.id} className="complaint-card">
                            <div className="complaint-header">
                                <div className="user-info">
                                    <div className="avatar">
                                        {complaint.firstName?.charAt(0)}{complaint.lastName?.charAt(0)}
                                    </div>
                                    <div className="user-details">
                                        <h3>{complaint.firstName} {complaint.lastName}</h3>
                                        <span>@{complaint.username} • {complaint.date}</span>
                                    </div>
                                </div>
                                <span className="complaint-location">📍 {complaint.location}</span>
                            </div>
                            <div className="complaint-body">
                                <p className="complaint-text">{complaint.complaint}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewComplaint;
