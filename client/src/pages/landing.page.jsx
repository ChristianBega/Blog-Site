import React from "react";
import HeroBgImg from "../assets/heroImage.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  return (
    // <section id="landing-page" className="container min-h-screen mx-auto | flex justify-center items-center ">
    // </section>
    /* <h1 className="text-3xl font-bold underline">landingPage</h1> */
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${HeroBgImg})` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
            id nisi.
          </p>
          <Link to="/signup">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
