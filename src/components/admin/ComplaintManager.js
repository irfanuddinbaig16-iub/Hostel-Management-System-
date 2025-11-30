import React, { useState } from 'react';

function ComplaintManager({ token }) {
  const [complaints, setComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [responseText, setResponseText] = useState('');

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleAddResponse = (id) => {
    if (!responseText.trim()) {
      alert('Please enter a response');
      return;
    }

    setComplaints(complaints.map(c => {
      if (c.id === id) {
        return {
          ...c,
          responses: [...c.responses, { admin: responseText, date: new Date().toISOString().split('T')[0] }]
        };
      }
      return c;
    }));

    setResponseText('');
    alert('Response added!');
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': 'danger',
      'In Progress': 'warning',
      'Resolved': 'success',
    };
    return badges[status] || 'secondary';
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card p-4">
          <h3 className="mb-4">All Complaints</h3>

          <div className="list-group">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className={`list-group-item list-group-item-action cursor-pointer ${selectedComplaint?.id === complaint.id ? 'active' : ''}`}
                onClick={() => setSelectedComplaint(complaint)}
              >
                <div className="d-flex w-100 justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{complaint.title}</h6>
                    <p className="mb-1 small text-muted">{complaint.studentName} - Room {complaint.roomNo}</p>
                    <p className="mb-0 small">{complaint.description.substring(0, 60)}...</p>
                  </div>
                  <div className="text-end">
                    <span className={`badge bg-${getStatusBadge(complaint.status)}`}>
                      {complaint.status}
                    </span>
                    <p className="mb-0 small text-muted mt-2">{complaint.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        {selectedComplaint ? (
          <div className="card p-4 sticky-top">
            <h5 className="mb-3">Complaint Details</h5>

            <div className="mb-3">
              <label className="form-label small"><strong>Title</strong></label>
              <p>{selectedComplaint.title}</p>
            </div>

            <div className="mb-3">
              <label className="form-label small"><strong>Student</strong></label>
              <p>{selectedComplaint.studentName} ({selectedComplaint.studentEmail})</p>
            </div>

            <div className="mb-3">
              <label className="form-label small"><strong>Category</strong></label>
              <span className="badge bg-info">{selectedComplaint.category}</span>
            </div>

            <div className="mb-3">
              <label className="form-label small"><strong>Description</strong></label>
              <p>{selectedComplaint.description}</p>
            </div>

            <div className="mb-3">
              <label className="form-label small"><strong>Status</strong></label>
              <select
                className="form-select form-select-sm"
                value={selectedComplaint.status}
                onChange={(e) => {
                  handleUpdateStatus(selectedComplaint.id, e.target.value);
                  setSelectedComplaint({ ...selectedComplaint, status: e.target.value });
                }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small"><strong>Responses</strong></label>
              <div className="border rounded p-2 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {selectedComplaint.responses.length > 0 ? (
                  selectedComplaint.responses.map((resp, idx) => (
                    <div key={idx} className="mb-2 pb-2 border-bottom">
                      <p className="mb-1 small">{resp.admin}</p>
                      <p className="mb-0 text-muted tiny">{resp.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small">No responses yet</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small"><strong>Add Response</strong></label>
              <textarea
                className="form-control form-control-sm"
                placeholder="Type your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() => handleAddResponse(selectedComplaint.id)}
              disabled={!responseText.trim()}
            >
              Send Response
            </button>
          </div>
        ) : (
          <div className="card p-4 text-center text-muted">
            <p>Select a complaint to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintManager;