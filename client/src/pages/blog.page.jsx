import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import StaticRobotoUserImg from "../assets/robotUserImg.jpeg";
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
    // console.log(socials);
    if (socials === undefined) {
      return (
        <>
          <li className="mt-2 disabledList">
            <a className="disabledLink" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
          </li>
          <li className="mt-2 disabledList">
            <a className="disabledLink" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
          </li>
          <li className="mt-2 disabledList">
            <a className="disabledLink" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
          </li>
        </>
      );
    } else {
      return socials?.map((social, socialUrl, socialPlatform, index) => {
        socialUrl = social.socialLink;
        socialPlatform = social.socialPlatform;
        if (socialPlatform === "Twitter") {
          return (
            <li key={index} className="mt-2">
              <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
                <FiTwitter />
              </a>
            </li>
          );
        } else if (socialPlatform === "Github") {
          return (
            <li key={index} className="mt-2">
              <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </a>
            </li>
          );
        } else {
          return (
            <li key={index} className="mt-2">
              <a href={`${socialUrl}`} target="_blank" rel="noopener noreferrer">
                <FiInstagram />
              </a>
            </li>
          );
        }
      });
    }
  };

  const renderComments = () => {
    let blogComments = singleBlogPost.comments;

    if (blogComments <= 0) {
      return (
        <div className="chat chat-start | flex flex-row justify-center	">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={StaticRobotoUserImg} />
            </div>
          </div>
          <div className="chat-bubble | w-11/12">No comments left! Be the first :D</div>
        </div>
      );
    } else {
      return blogComments?.map((singleComment, index) => {
        return (
          <div className="chat chat-start">
            <div key={index} className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={StaticRobotoUserImg} />
              </div>
            </div>
            <div className="chat-header my-2">
              Obi-Wan Kenobi
              <time className="ml-2 text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble | min-w-full">{singleComment.commentText}</div>
          </div>
        );
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center |  mt-10 p-4" creatorid={singleBlogPost.creatorId} blogid={currentBlogID}>
      {/* Blog Card Header */}
      <div className="card bg-base-200 shadow-xl p-4 | flex items-center w-10/12 md:w-8/12 lg:w-8/12 lg:max-w-2xl ">
        {/* Blog Header */}
        <div className="flex gap-6 justify-between lg:justify-center w-11/12">
          <div className="card-title flex gap-4 lg:w-1/2">
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
          {/* Filter socials */}
          <ul className="flex gap-4 justify-end lg:w-1/3">{filterSocials()}</ul>
        </div>
      </div>
      {/* Blog Post Card */}
      <div className="card bg-base-200 shadow-xl p-4 mt-5 | flex min-h-fit w-10/12 md:w-8/12 lg:w-8/12 lg:max-w-2xl">
        <div className="mt-5 ">
          <h1 className="text-3xl text-center">{singleBlogPost.blogTitle}</h1>
        </div>
        <div className=" card bg-slate-50 min-h-fit | mt-5 p-4">
          <p>{singleBlogPost.blogPost}</p>
        </div>
      </div>
      {/* Blog Comments */}
      <div className="card bg-base-200 shadow-xl p-4 mt-5 | flex min-h-fit w-10/12 md:w-8/12 lg:w-8/12 lg:max-w-2xl">
        <div className="my-5">
          <h2 className="text-3xl text-center">Comments</h2>
        </div>
        {/* Render blog comments */}
        {renderComments()}
      </div>
    </section>
  );
}
