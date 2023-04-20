import React from "react";
import { Link } from "react-router-dom";

import StaticImg from "../../assets/staticProfileImg.jpg";
export default function BlogPost({ blogData }) {
  // console.log(blogData);

  return (
    <article>
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Card Header */}
          <div className="card-header | flex gap-4 items-center  ">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={StaticImg} />
              </div>
            </div>
            <h2 className="">{blogData.creator}</h2>
          </div>
          <Link to="/blogPage">
            {/* Card Description/Title */}
            <p className="card-title | my-3">{blogData.blogPost}</p>
          </Link>

          <div className="card-actions justify-between items-center">
            <p>{blogData.createdAt}</p>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </article>
  );
}
