
export default function Logout() {
  function Logout() {
    localStorage.removeItem("token");
  }
  Logout();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          color: '#f1f5f9',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
          You have been logged out
        </h2>
        <p style={{ fontSize: '16px', color: '#cbd5e1' }}>
          Thank you for using the app. See you soon!
        </p>
      </div>
    </div>
  );
}
