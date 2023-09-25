import React from "react";
import "./Input.css";

const Input = ({ type, placeholder, value, onChange, name, disabled }) => {
  return (
    <input
      className="custom-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
    />
  );
};

export default Input;
