import { buildQuery } from "../helpers";

export const getCars = async () => {
  return fetch(`/cars`, { credentials: "include" }).then(
    (res) => {
      return res.json();
    }
  );
};

export const deleteCar = async (id) => {
  return fetch(`/cars/${id}`, { method: "DELETE" });
};
export const favoriteCar = async (data) => {
const query = new URLSearchParams(data)
  return fetch(`/cars/favorite?${query}`, { method: "POST" });
};
export const searchCar = async (query) => {
  return fetch(`/cars/search?${buildQuery(query)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};
