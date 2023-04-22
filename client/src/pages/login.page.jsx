import React, { useEffect } from "react";
import Login from "../components/Forms/login.component";

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <section id="login-page" className="container min-h-screen mx-auto | flex justify-center items-center ">
    // </section>
    <Login />
  );
}
