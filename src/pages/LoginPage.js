import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !role || !password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      // Backend ke liye ready - jab backend API hoga:
      // const response = await fetch('http://localhost:8000/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, role })
      // });
      // const data = await response.json();
      // onLogin(role, { email }, data.token);

      // Abhi ke liye mock data
      const mockToken = 'mock-jwt-token-' + Date.now();
      onLogin(role, { email, role }, mockToken);
      
    } catch (err) {
      setError('Login failed. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1> Hostel Management System</h1>
          <p>Management Portal</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Login As</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer mt-3">
          <p className="text-muted small">
            Demo: Use any email with password "password" and select role
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;