import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_BLOG_POST } from "../utils/queries";

export default function BlogPage() {
  const location = useLocation();
  const [currentBlogID, setCurrentBlogID] = useState("");
  const { loading, error, data } = useQuery(QUERY_SINGLE_BLOG_POST, { variables: { blogId: currentBlogID } });
  const singleBlogPost = data?.BlogPost || [];

  useEffect(() => {
    setCurrentBlogID(location.state?.currentBlogId);
  }, [currentBlogID]);

  return (
    <div>
      <p>{singleBlogPost.blogTitle}</p>
      <p>{singleBlogPost.blogPost}</p>
      <p>{singleBlogPost.createdAt}</p>
      <p>{singleBlogPost.creator}</p>
      {/* <p>{singleBlogPost.comments}</p> */}
    </div>
  );
}
