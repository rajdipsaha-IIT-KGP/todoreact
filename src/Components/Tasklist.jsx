import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Tasklist({ tasks, handleDeleteTask }) {
  const cardStyle = {
    width: "80%",
    margin: "16px auto",
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: "#1e293b", 
    color: "#f1f5f9", =
    fontSize: "18px",
    lineHeight: "1.6",
    border: "1px solid #334155",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    fontFamily: "'Poppins', sans-serif",
  };

  const deleteBtnStyle = {
    backgroundColor: "#ef4444", 
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "600",
    transition: "background 0.3s",
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = "#dc2626"; 
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = "#ef4444"; 
  };

  return (
    <>
      {tasks.map((task, index) => (
        <div className="card" style={cardStyle} key={index}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>{task}</span>
            <button
              onClick={() => handleDeleteTask(index)}
              style={deleteBtnStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
