import React from "react";
import "./Input.css";

const Input = ({ type, placeholder, value, onChange, name, disabled, checked }) => {
  return (
    <input
      className="custom-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      checked = {checked}
    />
  );
};

export default Input;
