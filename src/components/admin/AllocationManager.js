import React, { useState } from 'react';

function AllocationManager({ token }) {
  const [allocations, setAllocations] = useState([]);

  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    roomNo: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddAllocation = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.studentEmail || !formData.roomNo) {
      alert('Please fill all fields');
      return;
    }

    const newAllocation = {
      id: Math.max(...allocations.map(a => a.id), 0) + 1,
      ...formData,
      floor: Math.floor(Math.random() * 3) + 1,
      building: String.fromCharCode(65 + Math.floor(Math.random() * 3)),
      allocationDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    setAllocations([...allocations, newAllocation]);
    setFormData({ studentName: '', studentEmail: '', roomNo: '' });
    setShowForm(false);
    alert('Room allocated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this allocation?')) {
      setAllocations(allocations.filter(a => a.id !== id));
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Room Allocation</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Allocate Room'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card card-body bg-light mb-4">
          <form onSubmit={handleAddAllocation}>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.studentEmail}
                  onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                  placeholder="Email"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Room No</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.roomNo}
                  onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                  placeholder="101"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">&nbsp;</label>
                <button type="submit" className="btn btn-success w-100">
                  Allocate
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Allocations Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Room</th>
              <th>Building</th>
              <th>Floor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc) => (
              <tr key={alloc.id}>
                <td><strong>{alloc.studentName}</strong></td>
                <td>{alloc.studentEmail}</td>
                <td>{alloc.roomNo}</td>
                <td>{alloc.building}</td>
                <td>{alloc.floor}</td>
                <td>{alloc.allocationDate}</td>
                <td>
                  <span className="badge bg-success">{alloc.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(alloc.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllocationManager;