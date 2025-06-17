import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const menuStyle = {
    position: "absolute",
    top: "90px",
    right: "70px",
    background: "#1e293b", // dark background
    border: "1px solid #334155",
    borderRadius: "8px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
    padding: "10px 0",
    zIndex: 1000,
    width: "160px",
    fontSize: "15px",
    color: "#f1f5f9", // light text
    cursor: "pointer",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    pointerEvents: isOpen ? "auto" : "none",
    fontFamily: "'Poppins', sans-serif",
  };

  const menuItemStyle = {
    padding: "10px 20px",
    borderBottom: "1px solid #334155",
    color: "#f1f5f9",
    textDecoration: "none",
    display: "block",
    transition: "background 0.3s",
  };

  const menuItemHoverStyle = {
    backgroundColor: "#334155", // hover blue-gray
  };

  const profileIconContainerStyle = {
    position: "absolute",
    top: "20px",
    right: "50px",
    borderRadius: "50%",
    backgroundColor: "#334155",
    padding: "15px",
    color: "#f1f5f9",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div ref={menuRef}>
      <div style={profileIconContainerStyle} onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faUser} size="lg" />
      </div>

      <div style={menuStyle}>
        <Link to="/signin" style={menuItemStyle} onMouseOver={(e) => e.target.style.backgroundColor = menuItemHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>
          Sign In
        </Link>
        <Link to="/signup" style={menuItemStyle} onMouseOver={(e) => e.target.style.backgroundColor = menuItemHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>
          Sign Up
        </Link>
        <Link to="/logout" style={menuItemStyle} onMouseOver={(e) => e.target.style.backgroundColor = menuItemHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>
          Logout
        </Link>
        <Link to="/todos" style={{ ...menuItemStyle, borderBottom: "none" }} onMouseOver={(e) => e.target.style.backgroundColor = menuItemHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>
          Your ToDos
        </Link>
      </div>
    </div>
  );
}
