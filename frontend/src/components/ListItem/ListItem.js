import React from "react";
import "./ListItem.css";
import Actions from "./Actions";

export default function ListItem({
  image,
  children,
  deleteHandler,
  editHandler,
  blockHandler,
}) {
  return (
    <div className="list-container">
      <div
        className="item"
        style={{
          padding: "1rem",
        }}
      >
        <img
          alt="some nice car"
          height="auto"
          width={"100%"}
          loading="lazy"
          src={image}
        />
      </div>
      <div className="item">{children}</div>
      <div className="item">
        <Actions
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          blockHandler={blockHandler}
        />
      </div>
    </div>
  );
}
