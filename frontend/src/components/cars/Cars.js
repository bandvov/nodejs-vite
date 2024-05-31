import React, { useEffect, useState } from "react";
import { deleteCar, getCars, searchCar } from "../../api/cars";
import CarsHeader from "../SearchPanel/SearchPanel";
import ListItem from "../ListItem/ListItem";
import CarDetails from "./CarDetails";

export default function Cars() {
  const [cars, setCars] = useState([]);

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
            >
              <CarDetails showTitle car={car} />;
            </ListItem>
          );
        })}
    </div>
  );
}
