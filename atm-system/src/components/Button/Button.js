import React from "react";
import "./Button.css";

const Button = ({ onClick, children, secondary }) => {
  const buttonClassName = secondary ? "secondary-button" : "primary-button";
  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
