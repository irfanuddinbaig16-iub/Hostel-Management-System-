import React, { useState } from 'react';
import MyAllocation from '../components/student/MyAllocation';
import ComplaintPortal from '../components/student/ComplaintPortal';
import Notices from '../components/student/Notices';

function StudentDashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('allocation');

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1"> Student Portal</span>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">
              <i className="bi bi-person-circle"></i> {user.email}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid p-4">
        {/* Tabs Navigation */}
        <div className="nav nav-tabs mb-4" role="tablist">
          <button
            className={`nav-link ${activeTab === 'allocation' ? 'active' : ''}`}
            onClick={() => setActiveTab('allocation')}
          >
            My Room
          </button>
          <button
            className={`nav-link ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            Complaints
          </button>
          <button
            className={`nav-link ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            Notices
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'allocation' && <MyAllocation studentEmail={user.email} token={token} />}
          {activeTab === 'complaints' && <ComplaintPortal studentEmail={user.email} token={token} />}
          {activeTab === 'notices' && <Notices token={token} />}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;