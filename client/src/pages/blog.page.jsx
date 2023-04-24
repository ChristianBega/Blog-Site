import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_BLOG_POST } from "../utils/queries";
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

  const singleBlogPost = blogData?.BlogPost || [];

  useEffect(() => {
    setCurrentBlogID(location.state?.currentBlogId);
  }, [currentBlogID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const filterSocials = (socialLink) => {
  //   socialLink = singleUser.socials;
  //   return socialLink.map((userSocial, index) => (
  //     <li key={index}>
  //       <a href={`http://${userSocial.socialLink}`} target="_blank" rel="noopener noreferrer">
  //         <FiGithub />
  //       </a>
  //     </li>
  //   ));
  // };
  // call filter method
  // if socialPlatform === twitterf
  // if socialPlatform === instagram
  // if socialPlatform === github

  // then return and render out respected icon with users socialLink as href
  // if !singleProfile.socials return default https://SocialPlatform.com

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
          {/* {filterSocials()}  */}
          <li>
            <a target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
          </li>
          <li>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
          </li>
          <li>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
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
