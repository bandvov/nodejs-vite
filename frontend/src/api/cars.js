import { buildQuery } from "../helpers";

export const getCars = async () => {
  return fetch(`/api/cars`, { credentials: "include" }).then((res) => {
    return res.json();
  });
};

export const deleteCar = async (id) => {
  return fetch(`/api/cars/${id}`, { method: "DELETE" });
};
export const favoriteCar = async (data, method) => {
  const query = new URLSearchParams(data);
  return fetch(`/api/cars/favorite?${query}`, { method });
};
export const searchCar = async (query) => {
  return fetch(`/api/cars/search?${buildQuery(query)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};
