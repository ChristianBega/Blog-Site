import React, { useState } from "react";
import { ADD_USER_SOCIALS } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

// Auth
import Auth from "../../utils/auth";

export default function AddSocials() {
  const [currentUser, setCurrentUser] = useState(Auth.getProfile());

  const [formState, setFormState] = useState({ socialLink: "", socialPlatform: "" });

  const [addSocial, { error, data }] = useMutation(ADD_USER_SOCIALS);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addSocial({
        variables: { ...formState, userId: currentUser?.data._id },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // // clear form values
    // setFormState({
    //   email: "",
    //   password: "",
    // });
  };

  console.log(error);

  return (
    <form onSubmit={handleFormSubmit} className="form-control | flex flex-col items-center gap-4 | min-w-full">
      <h2 className="text-2xl font-bold">Add your social media links below!</h2>
      <input
        onChange={handleChange}
        value={formState.name}
        name="socialLink"
        type="text"
        placeholder="Enter in your social URL..."
        className="input input-bordered input-accent w-full sm:max-w-xs md:max-w-md"
      />
      {/* <input
        onChange={handleChange}
        value={formState.name}
        name="socialType"
        type="text"
        placeholder="Select a social platform"
        className="input input-bordered input-accent w-full sm:max-w-xs md:max-w-md"
      /> */}
      <select onChange={handleChange} value={formState.name} name="socialPlatform" className="select select-accent w-full sm:max-w-xs md:max-w-md">
        <option disabled selected>
          Select a social platform
        </option>
        <option>Github</option>
        <option>Twitter</option>
        <option>Instagram</option>
      </select>
      <button type="submit" value="submit" className="btn | mt-5">
        Confirm
      </button>
    </form>
  );
}
