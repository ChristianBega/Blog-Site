import React from "react";
import BlogPost from "../components/BlogPost/blogPost.component";

// GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_BLOG_POSTS } from "../utils/queries";
// import { useNavigate } from "react-router-dom";
// let history = useNavigate();

export default function HomePage() {
  // Filter those blog post based on user context - friends posts, their posts, all posts
  const { loading, error, data } = useQuery(QUERY_BLOG_POSTS);
  const blogPostData = data?.BlogPost || [];
  return (
    <section id="home-page" className="container min-h-screen mx-auto my-10 | flex flex-wrap gap-4 justify-center items-center ">
      {blogPostData.map((blogData, index) => (
        <BlogPost blogData={blogData} key={index} />
      ))}
    </section>
  );
}
