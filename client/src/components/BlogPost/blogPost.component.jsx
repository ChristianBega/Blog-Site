import React from "react";
import { Link } from "react-router-dom";

// Icons
// import { FiSave } from "react-icons/fi";

import StaticImg from "../../assets/staticProfileImg.jpg";
export default function BlogPost({ blogData }) {
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
          <Link to={`/blogPage/:${blogData._id}`} state={{ currentBlogId: blogData._id }}>
            {/* Card Description/Title */}
            <p className="card-title | my-3">{blogData.blogTitle}</p>
          </Link>

          <div className="card-actions justify-between items-center">
            {/* Card timeStamp */}
            <small>{blogData.createdAt}</small>
            {/* <button className="btn btn-primary | flex gap-2">
            <FiSave />
            save
          </button> */}
          </div>
        </div>
      </div>
    </article>
  );
}
