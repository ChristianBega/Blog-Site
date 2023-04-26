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

  // QUERY SINGLE USER by ID (creatorID)
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_SINGLE_PROFILE, { variables: { userId: singleBlogPost?.creatorId } });

  //
  const singleUser = userData?.User || [];
  console.log(singleUser);

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
          <li>
            <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
          </li>
        );
      } else if (socialPlatform === "Github") {
        return (
          <li>
            <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
          </li>
        );
      } else {
        return (
          <li>
            <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
          </li>
        );
      }
    });
  };

  // call filter method
  // if socialPlatform === twitter
  // if socialPlatform === instagram
  // if socialPlatform === github

  // then return and render out respected icon with users socialLink as href
  // if !singleProfile.socials return default https://SocialPlatform.com

  return (
    <section className="min-h-screen flex flex-col items-center | mt-10" creatorid={singleBlogPost.creatorId} blogid={currentBlogID}>
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

        <ul className="flex gap-6 | justify-end items-center">{filterSocials()}</ul>
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
