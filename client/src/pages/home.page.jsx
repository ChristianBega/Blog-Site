import React from "react";
import BlogPost from "../components/BlogPost/blogPost.component";

export default function HomePage() {
  // When the user logs in query for all blog post
  // Filter those blog post based on user context - friends posts, their posts, all posts
  return (
    <section id="home-page" className="container min-h-screen mx-auto my-10 | flex flex-wrap gap-4 justify-center items-center ">
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </section>
  );
}
