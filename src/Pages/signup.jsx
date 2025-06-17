import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp({ showNotification }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
      });

      if (response.data.message === "User created successfully") {
  localStorage.setItem("token", response.data.token); // ✅ Store the token
  showNotification("✅ Sign Up Successful");
  navigate('/todos'); // ✅ Go directly to todos page
}
else {
        showNotification("❌ Already exist: " + response.data.message);
      }
    } catch (error) {
      console.error("Sign up error:", error.response?.data || error.message);
      showNotification("❌ Sign Up Failed. Please try again.");
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#f8fafc',
          fontFamily: 'Poppins, sans-serif',
          textTransform: 'uppercase'
        }}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#cbd5e1', fontWeight: 'bold' }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                borderRadius: '8px',
                border: '1px solid #475569',
                backgroundColor: '#334155',
                color: '#f8fafc'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#cbd5e1', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                borderRadius: '8px',
                border: '1px solid #475569',
                backgroundColor: '#334155',
                color: '#f8fafc'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#cbd5e1', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                borderRadius: '8px',
                border: '1px solid #475569',
                backgroundColor: '#334155',
                color: '#f8fafc'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => navigate('/signin')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
