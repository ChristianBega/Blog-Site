import React, { useEffect, useState } from "react";
import { ADD_BLOG_POST } from "../../utils/mutations";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";

export default function AddBlogPost() {
  // use queryMe to find the logged in user for the creator
  // if no user then don't allow - optional chaining ?.

  const [currentUser, setCurrentUser] = useState(Auth.getProfile());
  const [formState, setFormState] = useState({ blogPost: "", blogTitle: "", creator: "" });
  const [addBlogPost, { error: mutationError, data: mutationData }] = useMutation(ADD_BLOG_POST);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const { mutationData } = await addBlogPost({
        variables: { ...formState, creator: currentUser?.data.username },
      });
      return mutationData;
    } catch (e) {
      console.error(e);
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
    <form onSubmit={handleSubmit} className="form-control | flex flex-col items-center gap-4 | min-w-full">
      <h2 text-5xl font-bold>
        Create a blog post!
      </h2>
      <input
        onChange={handleChange}
        value={formState.name}
        name="blogTitle"
        type="text"
        placeholder="Enter blog title here..."
        className="input input-bordered input-accent w-full sm:max-w-xs md:max-w-md"
      />

      <textarea
        onChange={handleChange}
        value={formState.name}
        name="blogPost"
        placeholder="Add a blog post here..."
        className="textarea textarea-bordered textarea-accent textarea-lg w-full sm:max-w-xs md:max-w-md"
      ></textarea>

      <button type="submit" value="submit" className="btn | mt-5">
        Create post
      </button>
    </form>
  );
}
