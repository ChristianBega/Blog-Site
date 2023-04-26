import React, { useEffect } from "react";
// GraphQL queries
import { useQuery } from "@apollo/client";
import { QUERY_BLOG_POSTS } from "../utils/queries";

// Components
import AddBlogPost from "../components/Forms/addBlogPost.component";
import BlogPost from "../components/BlogPost/blogPost.component";

export default function HomePage() {
  const { loading, error, data } = useQuery(QUERY_BLOG_POSTS);
  const blogPostData = data?.BlogPosts || [];

  // console.log(blogPostData);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <section id="home-page" className="container min-h-screen mx-auto my-10 | flex flex-wrap gap-4 justify-center items-center ">
      {/* {error?.(<p>{error.message}</p>)} */}
      <AddBlogPost blogPostData={blogPostData} />
      {loading ? "loading" : blogPostData.map((blogData, index) => <BlogPost blogData={blogData} key={index} />)}
    </section>
  );
}
