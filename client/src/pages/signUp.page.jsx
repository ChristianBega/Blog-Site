import React, { useEffect } from "react";
import SignUp from "../components/Forms/signUp.component";

export default function SignUpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <SignUp />;
}
