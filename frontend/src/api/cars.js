import { buildQuery } from "../helpers";

export const getCars = async () => {
  return fetch(process.env.REACT_APP_API_URL + `/cars`, {
    credentials: "include",
  }).then((res) => {
    return res.json();
  });
};
export const getCarById = async (id) => {
  return fetch(process.env.REACT_APP_API_URL + `/cars/${id}`, {
    credentials: "include",
  }).then((res) => {
    return res.json();
  });
};

export const deleteCar = async (id) => {
  return fetch(process.env.REACT_APP_API_URL + `/cars/${id}`, {
    method: "DELETE",
  });
};
export const favoriteCar = async (data, method) => {
  const query = new URLSearchParams(data);
  return fetch(process.env.REACT_APP_API_URL + `/cars/favorite?${query}`, {
    method,
  });
};
export const searchCar = async (query) => {
  return fetch(
    process.env.REACT_APP_API_URL + `/cars/search?${buildQuery(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });
};
