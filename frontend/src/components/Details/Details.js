import React from "react";
import "./Details.css";

export default function Details({ title, children }) {
  return (
    <div className="details-container">
      {title && <h2>{title}</h2>}
      <div className="details">{children}</div>
    </div>
  );
}
