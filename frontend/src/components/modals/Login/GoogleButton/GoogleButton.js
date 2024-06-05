import React from "react";
import "./GoogleButton.css";

export default function GoogleButton({ onClick }) {
  return (
    <button className="google-button" onClick={onClick}>
      <img src="/icons8-google.png" alt="Google logo" width="20" height="20" />
      Увійти з допомогою Google
    </button>
  );
}
