import React, { useEffect } from "react";
import Login from "../components/Forms/login.component";

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <Login />;
}
