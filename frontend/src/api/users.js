export const getUsers = async () => {
  return fetch(process.env.REACT_APP_API_URL + `/api/users`).then((res) => {
    return res?.json();
  });
};

export const getUserById = async (id) => {
  return fetch(process.env.REACT_APP_API_URL + `/api/users/${id}`).then(
    (res) => {
      return res.json();
    }
  );
};

export const createUser = async (data) => {
  return fetch(process.env.REACT_APP_API_URL + `/api/users/register`, {
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
  return fetch(process.env.REACT_APP_API_URL + `/api/auth/login`, {
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
  return fetch(process.env.REACT_APP_API_URL + `/api/users/${id}`, {
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
  return fetch(process.env.REACT_APP_API_URL + `/api/users/${id}`, {
    method: "DELETE",
  });
};
export const searchUser = async (query) => {
  return fetch(
    process.env.REACT_APP_API_URL + `/api/users/search?search=${query}`,
    {
      method: "GET",
    }
  ).then((res) => {
    return res.json();
  });
};
