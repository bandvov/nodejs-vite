import React from "react";
import Details from "../Details/Details";
import DetailItem from "../Details/DetailItem";

export default function CarDetails({ showTitle = false, car }) {
  return (
    <Details title={showTitle ? "Деталі автомобіля" : ""}>
      <DetailItem name={"Категорія"} value={car?.category} />
      <DetailItem name={"Колір"} value={car?.color} />
      <DetailItem name={"Ціна за годину"} value={car?.price_per_hour} />
      <DetailItem name={"тип"} value={car?.type} />
      <DetailItem
        name={"Марка і модель"}
        value={` ${car?.make} ${car?.model}`}
      />
    </Details>
  );
}
