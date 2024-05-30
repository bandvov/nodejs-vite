import { buildQuery } from "../helpers";

export const getCars = async () => {
  return fetch(`http://localhost:4000/cars`, { credentials: "include" }).then(
    (res) => {
      return res.json();
    }
  );
};

export const deleteCar = async (id) => {
  return fetch(`http://localhost:4000/cars/${id}`, { method: "DELETE" });
};
export const searchCar = async (query) => {
  return fetch(`http://localhost:4000/cars/search?${buildQuery(query)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};
