import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Input({ handleAddTask, handleAllClear }) {
    const [inputValue, setInputValue] = useState("");

    const containerStyle = {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px"
    };

    const inputRowStyle = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        gap: "10px"
    };

    const inputStyle = {
        flex: "1",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px"
    };

    const buttonStyle = {
        padding: "10px 15px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "background-color 0.2s ease"
    };

    const addBtnStyle = {
        ...buttonStyle,
        backgroundColor: "#28a745"
    };

    const clearBtnStyle = {
        ...buttonStyle,
        backgroundColor: "#dc3545"
    };

    const handleAddClick = () => {
        if (inputValue.trim() !== "") {
            handleAddTask(inputValue);
            setInputValue("");
        }
    };

    const clearFunction = () => {
        handleAllClear();
        setInputValue("");
    };

    return (
        <div style={containerStyle}>
            <div style={inputRowStyle}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    style={inputStyle}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button style={addBtnStyle} onClick={handleAddClick}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: "6px" }} />
                    Add
                </button>
                <button style={clearBtnStyle} onClick={clearFunction}>
                    Clear All
                </button>
            </div>
        </div>
    );
}
