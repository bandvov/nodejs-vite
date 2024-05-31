import React, { useEffect, useState } from "react";
import { deleteCar, favoriteCar, getCars, searchCar } from "../../api/cars";
import CarsHeader from "../SearchPanel/SearchPanel";
import ListItem from "../ListItem/ListItem";
import CarDetails from "./CarDetails";
import { useAuth } from "../../providers/AuthProvider";

export default function Cars() {
  const [cars, setCars] = useState([]);
const { userId } = useAuth();

  useEffect(() => {
    getCars().then((res) => {
      setCars(res);
    });
  }, []);
  const deleteHandler = (id) => {
    deleteCar(id).then(() => {
      getCars().then((res) => {
        setCars(res);
      });
    });
  };
  const searchHandler = (value) => {
    searchCar({ search: value }).then((res) => {
      console.log({ res });
      setCars(res);
    });
  };
  return (
    <div>
      <CarsHeader
        title={
          <span>
            Управління <span style={{ color: "orange" }}>автомобілями</span>
          </span>
        }
        searchHandler={searchHandler}
      />
      {cars?.length &&
        cars?.map((car) => {
          return (
            <ListItem
              image={car.image}
              deleteHandler={() => deleteHandler(car.id)}
              favoriteHandler = {()=> favoriteCar({car_id: car.id,user_id: userId})}
            >
              <CarDetails showTitle car={car} />;
            </ListItem>
          );
        })}
    </div>
  );
}
