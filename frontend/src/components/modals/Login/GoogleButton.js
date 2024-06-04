import React from "react";
import { loginGoogle } from "../../../api/auth";

export default function GoogleButton() {
  return (
    <button onClick={loginGoogle}>зареєструватись з допомогою google</button>
  );
}
