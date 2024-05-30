import React from "react";

export default function DetailItem({ name, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{name}:</span>
      <span>{value}</span>
    </div>
  );
}
