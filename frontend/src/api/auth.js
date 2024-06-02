export const loginFacebook = () => {
  console.log(window.location);
  window.location = process.env.REACT_APP_API_URL + "/api/auth/facebook";
};
