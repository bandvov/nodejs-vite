import React from "react";
import { loginFacebook } from "../../api/auth";

export default function FacebookButton() {
  return (
    <button onClick={loginFacebook}>
      зареєструватись з допомогою facebook
    </button>
  );
}
