import React from "react";
import "./ACtions.css";

export default function Actions({ deleteHandler, blockHandler, editHandler }) {
  return (
    <div className="">
      <h2>Дії</h2>
      <div className="car-actions">
        {blockHandler && (
          <button onClick={blockHandler} className="filled">
            Заблокувати
          </button>
        )}
        <button onClick={editHandler} className="outlined">
          Редагувати
        </button>
        <button onClick={deleteHandler} className="filled">
          Видалити
        </button>
      </div>
    </div>
  );
}
