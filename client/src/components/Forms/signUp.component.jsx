import React, { useState } from "react";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);
  let history = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          ...formState,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token, history);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section id="signup-hero" className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
            id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            {/* Username input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">UserName</span>
              </label>
              <input
                onChange={handleChange}
                value={formState.username}
                name="username"
                type="text"
                placeholder="username"
                className="input input-bordered"
              />
            </div>
            {/* email input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input onChange={handleChange} value={formState.email} name="email" type="text" placeholder="email" className="input input-bordered" />
            </div>
            {/* password input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={handleChange}
                value={formState.password}
                name="password"
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="/login" className="label-text-alt link link-hover">
                  Already have an account?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button onSubmit={handleFormSubmit} className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
