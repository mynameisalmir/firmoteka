import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex flex-row text-gray-50 font-semibold ">
      <div className="">
        <Link to="/" className="flex flex-row justify-center items-center m-2 hover:cursor-pointer bg-gray-50 bg-opacity-0 hover:bg-opacity-10 px-3 py-2">
          home
        </Link>
      </div>
      <div >
        <Link to="/login" className="flex flex-row justify-center items-center m-2 hover:cursor-pointer bg-gray-50 bg-opacity-0 hover:bg-opacity-10 px-3 py-2">
          login
        </Link>
      </div>
      <div>
        <Link to="/register" className="flex flex-row justify-center items-center m-2 hover:cursor-pointer bg-gray-50 bg-opacity-0 hover:bg-opacity-10 px-3 py-2">
          register
        </Link>
      </div>
    </div>
  );
};

export default Nav;
