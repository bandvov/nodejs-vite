import React from "react";
import Details from "../../Details/Details";
import DetailItem from "../../Details/DetailItem";

export default function UserPersonalInfo({ user }) {
  return (
    <div className="personal-data-container">
      <Details title={"Осибиста інформація"}>
        <DetailItem
          name={"ПІБ:"}
          value={
            <input
              disabled
              type="text"
              value={user?.first_name + " " + user?.last_name}
            />
          }
        />
        <DetailItem
          name={"Електронна пошта:"}
          value={<input disabled type="text" value={user?.email} />}
        />
        <DetailItem
          name={"Номер телефону:"}
          value={<input disabled type="text" value={user?.phone_number} />}
        />
      </Details>
    </div>
  );
}
