// CarCard.js
import React, { useState } from "react";
import "./CarCard.css";
import { ReactComponent as HeartIcon } from "./heart.svg";
import CarDetails from "../CarDetails";

const CarCard = ({ favoriteHandler, isFavorited = false, car }) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const toggleFavorite = () => {
    favoriteHandler().the((res) => {
      if (res.success) {
        setIsFavorite(!isFavorite);
      }
    });
  };
  return (
    <div className="CarCard">
      <div className="body__elem">
        <div className="elem__img">
          <img src={car.image} alt={car.model} />
        </div>
        <div className="elem__text">
          <h3>{car.model}</h3>
          <CarDetails car={car} />
        </div>
        <div className="elem__button">
          {" "}
          <button
            type="submit"
            className="elem__button__elements"
            name={car.id}
          >
            {car.price_per_hour > 0 ? "Орендувати" : "Недоступно для оренди"}
          </button>
          <button onClick={toggleFavorite} className="heart-button">
            <HeartIcon
              className={isFavorite ? "heart-icon favorite" : "heart-icon"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
