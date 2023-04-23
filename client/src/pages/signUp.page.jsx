import React, { useEffect } from "react";
import SignUp from "../components/Forms/signUp.component";

export default function SignUpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <section id="sign-up-page" className="container min-h-screen mx-auto | flex justify-center items-center ">
    //   </section>
    <SignUp />
  );
}
