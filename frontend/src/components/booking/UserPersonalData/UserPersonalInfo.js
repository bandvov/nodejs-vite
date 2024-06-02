import React from "react";
import Details from "../../Details/Details";
import DetailItem from "../../Details/DetailItem";

export default function UserPersonalInfo() {
  return (
    <div className="personal-data-container">
      <Details title={"Персональна інформація"}>
        <DetailItem
          name={"ПІБ:"}
          value={
            <input
              disabled
              type="text"
              value="asdasd"
            />
          }
        />
        <DetailItem
          name={"Електронна пошта:"}
          value={<input disabled type="text" value="asdasd" />}
        />
        <DetailItem
          name={"Номер телефону:"}
          value={<input disabled type="text" value="asdasd" />}
        />
      </Details>
    </div>
  );
}
