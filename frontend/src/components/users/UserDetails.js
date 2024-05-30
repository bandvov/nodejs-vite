import React from "react";
import Details from "../Details/Details";
import DetailItem from "../Details/DetailItem";

export default function UserDetails({ user }) {
  return (
    <Details title="Особисті дані">
      <DetailItem name={"Імя"} value={user?.first_name} />
      <DetailItem name={"Прізвище"} value={user?.last_name} />
      <DetailItem name={"Електронна пошта"} value={user?.email} />
      <DetailItem name={"Телефон"} value={user?.phone_number} />
      <DetailItem
        name={"Дата реєстрації"}
        value={new Date(user?.created_at)
          .toLocaleDateString()
          .replace(/\//g, ".")}
      />
    </Details>
  );
}
