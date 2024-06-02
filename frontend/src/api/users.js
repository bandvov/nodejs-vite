export const getUsers = async () => {
  return fetch(process.env.REACT_APP_API_URL + `/users`).then((res) => {
    return res?.json();
  });
};

export const getUserById = async (id) => {
  return fetch(process.env.REACT_APP_API_URL + `/users/${id}`).then(
    (res) => {
      return res.json();
    }
  );
};

export const createUser = async (data) => {
  return fetch(process.env.REACT_APP_API_URL + `/users/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res?.json();
  });
};

export const login = async (data) => {
  return fetch(process.env.REACT_APP_API_URL + `/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    return res?.json();
  });
};
export const blockUser = async (id) => {
  return fetch(process.env.REACT_APP_API_URL + `/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      blocked: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res?.json();
  });
};

export const deleteUser = async (id) => {
  return fetch(process.env.REACT_APP_API_URL + `/users/${id}`, {
    method: "DELETE",
  });
};
export const searchUser = async (query) => {
  return fetch(
    process.env.REACT_APP_API_URL + `/users/search?search=${query}`,
    {
      method: "GET",
    }
  ).then((res) => {
    return res.json();
  });
};
