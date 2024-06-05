import React, { useState } from "react";
import "./DatePick.css";
import Details from "../../Details/Details";
import DetailItem from "../../Details/DetailItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <Details title={"Оберіть дату і час"}>
      <DetailItem
        name={"Дата бронювання з:"}
        value={
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
        }
      />
      <DetailItem
        name={"Дата бронювання по:"}
        value={
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
          />
        }
      />
    </Details>
  );
}
