import React, { useState } from 'react';

function NoticeManager({ token }) {
  const [notices, setNotices] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.type) {
      alert('Please fill all fields');
      return;
    }

    const newNotice = {
      id: Math.max(...notices.map(n => n.id), 0) + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      createdBy: 'Admin',
    };

    setNotices([...notices, newNotice]);
    setFormData({ title: '', content: '', type: '' });
    setShowForm(false);
    alert('Notice published!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Maintenance': 'warning',
      'Payment': 'danger',
      'Event': 'info',
      'Policy': 'primary',
    };
    return colors[type] || 'secondary';
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Notices</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ New Notice'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card card-body bg-light mb-4">
          <form onSubmit={handleAddNotice}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Notice title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Payment">Payment</option>
                <option value="Event">Event</option>
                <option value="Policy">Policy</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Notice content"
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-success">
              Publish Notice
            </button>
          </form>
        </div>
      )}

      {/* Notices List */}
      <div className="row">
        {notices.map((notice) => (
          <div className="col-md-6 mb-3" key={notice.id}>
            <div className="card h-100">
              <div className="card-header bg-light d-flex justify-content-between">
                <h6 className="mb-0">{notice.title}</h6>
                <span className={`badge bg-${getTypeBadge(notice.type)}`}>
                  {notice.type}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{notice.content}</p>
              </div>
              <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                <small className="text-muted">{notice.date}</small>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(notice.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticeManager;