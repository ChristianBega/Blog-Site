import React from "react";
import { Link } from "react-router-dom";
// Images
import Logo from "../../assets/logo.jpeg";
// Icons
import { FiUser, FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";
// FiLogIn;
// FiLogOut;
export default function Navigation() {
  return (
    <nav className="sticky top-0 w-full, h-20 flex justify-between items-center px-8 text-white bg-zinc-900/50 backdrop-blur-sm z-50">
      {/* <button>LOGO</button> */}
      <a href="/">
        <img className="max-h-12 rounded-full" src={Logo} alt="Brain lightbulb logo" />
      </a>
      <h1 className="text-3xl text-[#edeaea]">Coding Circle</h1>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn m-1">
          <FiUser size={16} />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-content rounded-box w-52 | mt-5">
          <li>
            <button>
              {/* If logged in show logout icon  */}
              {/* If not logged in show login icon  */}
              <FiLogIn />
              {/* <FiLogOut /> */}
              <Link to="/login">Login</Link>
            </button>
          </li>
          <li>
            <button>
              <FiUserPlus />
              <Link to="/signup">Sign Up</Link>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* <a href="https://www.flaticon.com/free-icons/deep-learning" title="deep learning icons">
  Deep learning icons created by nangicon - Flaticon
</a>; */
