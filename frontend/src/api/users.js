export const getUsers = async () => {
  return fetch(`/users`).then((res) => {
    return res?.json();
  });
};
export const createUser = async (data) => {
  return fetch(`/users/register`, {
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
  return fetch(`/auth/login`, {
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
  return fetch(`/users/${id}`, {
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
  return fetch(`/users/${id}`, {
    method: "DELETE",
  });
};
export const searchUser = async (query) => {
  return fetch(`/users/search?search=${query}`, {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
};
