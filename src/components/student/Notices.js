import React, { useState } from 'react';

function Notices({ token }) {
  const [notices] = useState([]);

  const [filter, setFilter] = useState('All');

  const filteredNotices = filter === 'All' ? notices : notices.filter(n => n.type === filter);

  const getTypeBadge = (type) => {
    const colors = {
      'Maintenance': 'warning',
      'Payment': 'danger',
      'Event': 'info',
      'Policy': 'primary',
      'Safety': 'danger',
    };
    return colors[type] || 'secondary';
  };

  const getImportanceBadge = (importance) => {
    return importance === 'High' ? 'danger' : 'warning';
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📢 Hostel Notices</h3>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          {['All', 'Maintenance', 'Payment', 'Event', 'Policy', 'Safety'].map((type) => (
            <button
              key={type}
              className={`btn btn-sm ${filter === type ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      <div className="row">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div className="col-md-6 mb-3" key={notice.id}>
              <div className="card h-100 border-0 shadow-sm transition-all">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{notice.title}</h6>
                  <div>
                    <span className={`badge bg-${getTypeBadge(notice.type)} me-2`}>
                      {notice.type}
                    </span>
                    <span className={`badge bg-${getImportanceBadge(notice.importance)}`}>
                      {notice.importance}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{notice.content}</p>
                </div>
                <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                  <small className="text-muted">📅 {notice.date}</small>
                  <button className="btn btn-sm btn-outline-primary">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted py-5">
            <p>No notices available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notices;