import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_BLOG_POST } from "../utils/queries";
import { FiInstagram, FiGithub, FiTwitter } from "react-icons/fi";

// Images
import StaticImg from "../assets/staticProfileImg.jpg";

export default function BlogPage() {
  const location = useLocation();
  const [currentBlogID, setCurrentBlogID] = useState("");
  const { loading, error, data } = useQuery(QUERY_SINGLE_BLOG_POST, { variables: { blogId: currentBlogID } });
  const singleBlogPost = data?.BlogPost || [];

  useEffect(() => {
    setCurrentBlogID(location.state?.currentBlogId);
  }, [currentBlogID]);

  return (
    <section className="min-h-screen flex flex-col items-center | mt-10" id={currentBlogID}>
      <div className="flex gap-4 w-6/12 | justify-between">
        <div className="flex gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={StaticImg} />
            </div>
          </div>
          <div>
            <h2 className="">{singleBlogPost.creator}</h2>
            <small>{singleBlogPost.createdAt}</small>
          </div>
        </div>

        <ul className="flex gap-6 | justify-end items-center">
          <li>
            <Link>
              <FiGithub />
            </Link>
          </li>
          <li>
            <Link>
              <FiInstagram />
            </Link>
          </li>
          <li>
            <Link>
              <FiTwitter />
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <h1 className="text-3xl">{singleBlogPost.blogTitle}</h1>
      </div>
      <div className="mt-5">
        <p>{singleBlogPost.blogPost}</p>
      </div>
    </section>
  );
}
