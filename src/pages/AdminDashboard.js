import React, { useState } from 'react';
import RoomManagement from '../components/admin/RoomManagement';
import AllocationManager from '../components/admin/AllocationManager';
import ComplaintManager from '../components/admin/ComplaintManager';
import NoticeManager from '../components/admin/NoticeManager';

function AdminDashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalRooms: 0,
    occupiedRooms: 0,
    totalStudents: 0,
    pendingComplaints: 0
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1"> Admin Panel</span>
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
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-primary">
              <div className="card-body">
                <h5 className="card-title">Total Rooms</h5>
                <p className="card-text fs-4">{stats.totalRooms}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success">
              <div className="card-body">
                <h5 className="card-title">Occupied</h5>
                <p className="card-text fs-4">{stats.occupiedRooms}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-info">
              <div className="card-body">
                <h5 className="card-title">Total Students</h5>
                <p className="card-text fs-4">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning">
              <div className="card-body">
                <h5 className="card-title">Pending Complaints</h5>
                <p className="card-text fs-4">{stats.pendingComplaints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="nav nav-tabs mb-4" role="tablist">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-link ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
          </button>
          <button
            className={`nav-link ${activeTab === 'allocation' ? 'active' : ''}`}
            onClick={() => setActiveTab('allocation')}
          >
            Allocation
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
          {activeTab === 'dashboard' && (
            <div className="card p-4">
              <h3>Welcome, Admin!</h3>
              <p>Select a tab to manage the hostel system.</p>
            </div>
          )}
          {activeTab === 'rooms' && <RoomManagement token={token} />}
          {activeTab === 'allocation' && <AllocationManager token={token} />}
          {activeTab === 'complaints' && <ComplaintManager token={token} />}
          {activeTab === 'notices' && <NoticeManager token={token} />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;