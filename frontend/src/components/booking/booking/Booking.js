import React, { useEffect, useState } from "react";
import "./Booking.css";
import CarDetails from "../../cars/CarDetails";
import DatePick from "../DatePick/DatePick";
import Divider from "../divider/Divider";
import UserPersonalInfo from "../UserPersonalData/UserPersonalInfo";
import { useParams } from "react-router-dom";
import { getCarById } from "../../../api/cars";
import { useAuth } from "../../../providers/AuthProvider";
import { getUserById } from "../../../api/users";

export default function Booking() {
  const { id } = useParams();
  const { user } = useAuth();

  const [carDetails, setCarDetaisl] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getCarById(id).then((res) => {
      setCarDetaisl(res);
      console.log({ res });
    });
    console.log({ user });
    getUserById(user?.id).then((res) => {
      setUserData(res);
    });
  }, []);

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
              alt={carDetails?.make + " " + carDetails?.model}
              width="100%"
              height="300px"
              src={carDetails?.image}
            />
          </div>
          <div className="booking-container-details">
            <CarDetails showTitle car={carDetails} />
            <Divider />
            <DatePick />
            <Divider />
            <UserPersonalInfo user={userData} />
          </div>
        </div>
        <button>Орендувати</button>
      </div>
    </div>
  );
}
