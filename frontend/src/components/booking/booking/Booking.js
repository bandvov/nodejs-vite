import React, { useEffect, useState } from "react";
import "./Booking.css";
import CarDetails from "../../cars/CarDetails";
import DatePick from "../DatePick/DatePick";
import Divider from "../divider/Divider";
import UserPersonalInfo from "../UserPersonalData/UserPersonalInfo";
import { useParams } from "react-router-dom";
import { getCarById } from "../../../api/cars";

export default function Booking() {
  const { id } = useParams();
  const [carDetails, setCarDetaisl] = useState(null);
  useEffect(() => {
    getCarById(id).then((res) => {
      setCarDetaisl(res);
      console.log({ res });
    });
  });

  return (
    <div>
      <h1>Бронювання автомобіля</h1>
      <div className="booking-container">
        <div className="booking-container-content">
          <div className="booking-container-image">
            <img
              style={{
                objectFit: "booking-container-contain",
              }}
              alt="woohee"
              width="100%"
              height="300px"
              src="https://i.mydramalist.com/e3Q0pc.jpg"
            />
          </div>
          <div className="booking-container-details">
            <CarDetails
              showTitle
              car={{
                make: "test",
                model: "test",
                color: "test",
                price_per_hour: "test",
                category: "test",
                type: "test",
              }}
            />
            <Divider />
            <DatePick />
            <Divider />
            <UserPersonalInfo />
          </div>
        </div>
        <button>Орендувати</button>
      </div>
    </div>
  );
}
