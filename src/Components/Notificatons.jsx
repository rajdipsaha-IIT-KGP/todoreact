import React from 'react';

export default function Notification({ message, type = "info", onClose }) {
  if (!message) return null;

  const backgroundColors = {
    success: '#16a34a',
    error: '#dc2626',
    info: '#3b82f6',
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: backgroundColors[type] || backgroundColors.info,
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '300px',
      maxWidth: '90%',
    }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: '16px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
    </div>
  );
}
