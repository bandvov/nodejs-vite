export const loginFacebook = () => {
  console.log(window.location);
  window.location = process.env.REACT_APP_API_URL + "/auth/facebook";
};
export const loginGoogle = () => {
  console.log(window.location);
  window.location = process.env.REACT_APP_API_URL + "/auth/google";
};
