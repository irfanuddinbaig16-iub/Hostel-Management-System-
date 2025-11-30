import React, { useState } from 'react';

function ComplaintPortal({ studentEmail, token }) {
  const [complaints, setComplaints] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill all fields');
      return;
    }

    const newComplaint = {
      id: Math.max(...complaints.map(c => c.id), 0) + 1,
      ...formData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      responses: [],
    };

    setComplaints([...complaints, newComplaint]);
    setFormData({ title: '', description: '', category: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'danger',
      'In Progress': 'warning',
      'Resolved': 'success',
    };
    return colors[status] || 'secondary';
  };

  return (
    <div className="row">
      {/* File Complaint Form */}
      <div className="col-lg-5">
        <div className="card p-4">
          <h4 className="mb-4">📝 File a Complaint</h4>

          {submitted && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              ✓ Complaint submitted successfully!
              <button type="button" className="btn-close" onClick={() => setSubmitted(false)}></button>
            </div>
          )}

          <form onSubmit={handleSubmitComplaint}>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">-- Select Category --</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Furniture">Furniture</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Noise">Noise Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief title of complaint"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your issue in detail..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>

      {/* Complaints List */}
      <div className="col-lg-7">
        <div className="card p-4">
          <h4 className="mb-4">📋 Your Complaints</h4>

          {complaints.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>No complaints filed yet</p>
            </div>
          ) : (
            <div className="list-group">
              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className={`list-group-item list-group-item-action cursor-pointer ${selectedComplaint?.id === complaint.id ? 'active' : ''}`}
                  onClick={() => setSelectedComplaint(complaint)}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{complaint.title}</h6>
                      <p className="mb-1 small text-muted">{complaint.description.substring(0, 50)}...</p>
                    </div>
                    <span className={`badge bg-${getStatusBadge(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{complaint.category}</small>
                    <small className="text-muted">{complaint.date}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Complaint Details */}
        {selectedComplaint && (
          <div className="card p-4 mt-4">
            <h5 className="mb-3">Complaint Details</h5>

            <div className="mb-3">
              <label className="form-label small text-muted"><strong>Title</strong></label>
              <p>{selectedComplaint.title}</p>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted"><strong>Category</strong></label>
              <span className="badge bg-info">{selectedComplaint.category}</span>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted"><strong>Description</strong></label>
              <p>{selectedComplaint.description}</p>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted"><strong>Status</strong></label>
              <span className={`badge bg-${getStatusBadge(selectedComplaint.status)}`}>
                {selectedComplaint.status}
              </span>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted"><strong>Filed on</strong></label>
              <p>{selectedComplaint.date}</p>
            </div>

            {selectedComplaint.responses.length > 0 && (
              <div className="mb-3">
                <label className="form-label small text-muted"><strong>Admin Responses</strong></label>
                <div className="border rounded p-3 bg-light">
                  {selectedComplaint.responses.map((resp, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="mb-1 small"><strong>Response:</strong> {resp.admin}</p>
                      <p className="text-muted tiny mb-0">{resp.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintPortal;