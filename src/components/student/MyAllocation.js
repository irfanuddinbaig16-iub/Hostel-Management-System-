import React, { useState } from 'react';

function MyAllocation({ studentEmail, token }) {
  const [allocation] = useState(null);

  const [changeRequest, setChangeRequest] = useState('');
  const [changeRequests, setChangeRequests] = useState([]);

  const handleChangeRoom = (e) => {
    e.preventDefault();
    if (!changeRequest.trim()) {
      alert('Please enter a reason');
      return;
    }

    const newRequest = {
      id: Math.max(...changeRequests.map(r => r.id), 0) + 1,
      reason: changeRequest,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };

    setChangeRequests([...changeRequests, newRequest]);
    setChangeRequest('');
    alert('Room change request submitted!');
  };

  return (
    <div className="row">
      {/* Current Room Info */}
      <div className="col-lg-6 mb-4">
        <div className="card p-4">
          <h4 className="mb-4">🏠 Your Room Allocation</h4>

          {allocation ? (
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label small text-muted">Room Number</label>
                <p className="fs-5 fw-bold text-primary">{allocation.roomNo}</p>
              </div>
              <div className="col-6">
                <label className="form-label small text-muted">Building</label>
                <p className="fs-5 fw-bold">{allocation.building}</p>
              </div>
              <div className="col-6">
                <label className="form-label small text-muted">Floor</label>
                <p className="fs-5 fw-bold">{allocation.floor}</p>
              </div>
              <div className="col-6">
                <label className="form-label small text-muted">Occupants</label>
                <p className="fs-5 fw-bold">{allocation.occupants}/{allocation.capacity}</p>
              </div>
              <div className="col-6">
                <label className="form-label small text-muted">Allocation Date</label>
                <p className="small">{allocation.allocationDate}</p>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              <p className="mb-0">ℹ️ No room allocation yet. Contact admin for room assignment.</p>
            </div>
          )}

          <div className="alert alert-info mt-3 small">
            ℹ️ Your room details are shown above. Contact admin for any changes.
          </div>
        </div>
      </div>

      {/* Roommates */}
      <div className="col-lg-6 mb-4">
        <div className="card p-4">
          <h4 className="mb-4">👥 Your Roommates</h4>

          {allocation && allocation.roommates && allocation.roommates.length > 0 ? (
            <div className="list-group">
              {allocation.roommates.map((roommate, idx) => (
                <div className="list-group-item d-flex align-items-center" key={idx}>
                  <div
                    className="rounded-circle bg-primary text-white me-3 d-flex align-items-center justify-content-center"
                    style={{ width: '45px', height: '45px', fontSize: '20px' }}
                  >
                    {roommate.name.charAt(0)}
                  </div>
                  <div>
                    <h6 className="mb-0">{roommate.name}</h6>
                    <small className="text-muted">{roommate.email}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              <p className="mb-0">ℹ️ No roommates assigned yet.</p>
            </div>
          )}

          <div className="alert alert-info mt-3 small">
            ℹ️ You can contact your roommates for hostel-related discussions.
          </div>
        </div>
      </div>

      {/* Room Change Request */}
      <div className="col-lg-12">
        <div className="card p-4">
          <h4 className="mb-4">🔄 Room Change Requests</h4>

          <div className="row">
            {/* Form */}
            <div className="col-lg-5">
              <div className="card card-body bg-light">
                <h6>Request a Room Change</h6>
                <form onSubmit={handleChangeRoom}>
                  <div className="mb-3">
                    <label className="form-label small">Reason for Change</label>
                    <textarea
                      className="form-control"
                      value={changeRequest}
                      onChange={(e) => setChangeRequest(e.target.value)}
                      placeholder="Explain why you need a room change..."
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-warning w-100">
                    Submit Request
                  </button>
                </form>
              </div>
            </div>

            {/* Requests History */}
            <div className="col-lg-7">
              <h6 className="mb-3">Your Requests</h6>
              <div className="list-group">
                {changeRequests.length > 0 ? (
                  changeRequests.map((req) => (
                    <div className="list-group-item" key={req.id}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{req.reason}</h6>
                          <small className="text-muted">Submitted on {req.date}</small>
                        </div>
                        <span className={`badge ${req.status === 'Pending' ? 'bg-warning' : req.status === 'Approved' ? 'bg-success' : 'bg-danger'}`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small">No room change requests yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAllocation;