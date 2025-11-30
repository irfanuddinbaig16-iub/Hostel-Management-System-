import React, { useState } from 'react';

function RoomManagement({ token }) {
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    number: '',
    building: '',
    floor: '',
    capacity: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!formData.number || !formData.building || !formData.floor || !formData.capacity) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      // Update existing
      setRooms(rooms.map(r => r.id === editingId ? { ...r, ...formData } : r));
      setEditingId(null);
    } else {
      // Add new
      const newRoom = {
        id: Math.max(...rooms.map(r => r.id), 0) + 1,
        ...formData,
        occupied: 0,
      };
      setRooms([...rooms, newRoom]);
    }

    setFormData({ number: '', building: '', floor: '', capacity: '' });
    setShowForm(false);
  };

  const handleEdit = (room) => {
    setFormData(room);
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Room Management</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Room'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card card-body bg-light mb-4">
          <form onSubmit={handleAddRoom}>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="e.g., 101"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Building</label>
                <select
                  className="form-select"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Floor</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="2"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">&nbsp;</label>
                <button type="submit" className="btn btn-success w-100">
                  {editingId ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Rooms Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Room #</th>
              <th>Building</th>
              <th>Floor</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Available</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td><strong>{room.number}</strong></td>
                <td>{room.building}</td>
                <td>{room.floor}</td>
                <td>{room.capacity}</td>
                <td>{room.occupied}</td>
                <td>{room.capacity - room.occupied}</td>
                <td>
                  <span className={`badge ${room.capacity - room.occupied > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {room.capacity - room.occupied > 0 ? 'Available' : 'Full'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
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

export default RoomManagement;