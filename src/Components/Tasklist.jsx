import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tasklist({ tasks, handleDeleteTask }) {
  const cardStyle = {
    width: "80%",
    margin: "16px auto",
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: "#1e293b",
    color: "#f1f5f9",
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
    <AnimatePresence>
      {tasks.map((task, index) => (
        <motion.div
          key={task + index}
          className="card"
          style={cardStyle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
