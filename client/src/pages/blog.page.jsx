import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_BLOG_POST, QUERY_SINGLE_PROFILE } from "../utils/queries";
import { FiInstagram, FiGithub, FiTwitter } from "react-icons/fi";
// Auth

// Images
import StaticImg from "../assets/staticProfileImg.jpg";

export default function BlogPage() {
  // using useLocation to access props passed from Link
  const location = useLocation();
  const [currentBlogID, setCurrentBlogID] = useState("");

  // QUERY SINGLE BLOG POST by ID
  const { loading: blogLoading, error: blogError, data: blogData } = useQuery(QUERY_SINGLE_BLOG_POST, { variables: { blogId: currentBlogID } });
  // Response from QUERY SINGLE BLOG POST
  const singleBlogPost = blogData?.BlogPost || [];
  // console.log(singleBlogPost);
  // QUERY SINGLE USER by ID (creatorID)
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_SINGLE_PROFILE, { variables: { userId: singleBlogPost?.creatorId } });

  // Response from QUERY SINGLE Post
  const singleUser = userData?.User || [];

  useEffect(() => {
    setCurrentBlogID(location.state?.currentBlogId);
  }, [currentBlogID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterSocials = () => {
    let socials = singleUser.socials;
    return socials?.map((social, socialUrl, socialPlatform) => {
      socialUrl = social.socialLink;
      socialPlatform = social.socialPlatform;
      if (socialPlatform === "Twitter") {
        return (
          <li className="mt-2">
            <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
          </li>
        );
      } else if (socialPlatform === "Github") {
        return (
          <li className="mt-2">
            <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
          </li>
        );
      } else {
        return (
          <li className="mt-2">
            <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
          </li>
        );
      }
    });
  };

  return (
    <section className=" min-h-screen flex flex-col items-center | mt-10 p-4" creatorid={singleBlogPost.creatorId} blogid={currentBlogID}>
      <div className="card bg-base-200 shadow-xl p-4 | flex  justify-between w-auto">
        <div className="flex gap-6">
          <div className="card-title flex gap-4">
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
          <ul className="flex gap-4">{filterSocials()}</ul>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl p-4 |flex  justify-center max-w-lg | mt-5">
        <div className="mt-5 ">
          <h1 className="text-3xl text-center">{singleBlogPost.blogTitle}</h1>
        </div>
        <div className="mt-5">
          <p>{singleBlogPost.blogPost}</p>
        </div>
      </div>
    </section>
  );
}
