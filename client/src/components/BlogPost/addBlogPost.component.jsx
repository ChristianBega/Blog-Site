import React, { useState } from "react";
import { ADD_BLOG_POST } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

export default function AddBlogPost() {
  // use queryMe to find the logged in user for the creator
  // if no user then don't allow - optional chaining ?.

  // working on using queryMe to grab the logged in user ID and then use that as the creator ID for when they create a post.
  const [formState, setFormState] = useState({ blogPost: "", blogTitle: "", creator: "" });

  const [addBlogPost, { error: mutationError, data: mutationData }] = useMutation(ADD_BLOG_POST);

  const { loading, error: queryError, data: queryData } = useQuery(QUERY_ME);

  const currentUser = queryData?.Users;
  console.log("creator", queryData);
  console.log("error", queryError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { mutationData } = await addBlogPost({
        variables: { ...formState },
      });
      console.log(mutationData);
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
    //
    <form onSubmit={handleSubmit} className="form-control | flex flex-col items-center gap-4 | min-w-full">
      <h1>Create a blog post!</h1>
      <p>{currentUser}</p>
      <input
        onChange={handleChange}
        value={formState.name}
        name="blogTitle"
        type="text"
        placeholder="Enter blog title here..."
        className="input input-bordered input-accent w-full sm:max-w-xs md:max-w-md"
      />
      <input
        onChange={handleChange}
        value={formState.name}
        name="creator"
        type="text"
        placeholder="Enter creator of blog here..."
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
    // <section id="add-blog-post">
    // </section>
  );
}
{
  /* <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </label>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <label className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </label>
</div>; */
}
