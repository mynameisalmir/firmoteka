import React, { useState } from "react";
import bgLarge from "app/images/bg-large.png";
import bgSmall from "app/images/bg-small.png";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "app/UserPool";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onFailure: (err) => {
        console.error("onFailure", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired", data);
      },
    });
  };

  return (
    <div>
      {/* <img src={bgLarge} alt="lg:block hidden absolute z-0" />
        <img src={bgSmall} className="lg:hidden absolute z-0" alt="" /> */}
      <div className="lg:flex hidden items-center justify-center  min-h-screen">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center shadow-md bg-gray-50 rounded-lg py-20 px-24"
        >
          <p className="text-xl font-bold">Login</p>
          <input
            className="mt-10 rounded-lg px-7 py-2 shadow-md focus:outline-none"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-gray-400 text-md">Email</p>
          <input
            className="shadow-md rounded-lg px-7 py-2 mt-5 focus:outline-none"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-gray-400 mb-10 text-md">Lozinka</p>
          <button
            className="bg-blue-400 hover:bg-blue-500 w-24 py-2 rounded-lg text-gray-50 font-semibold"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
      <div className="lg:hidden">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center shadow-md bg-gray-50 rounded-lg mt-32 w-60 h-64"
        >
          <p>Login Form</p>
          <input
            className="mt-10 rounded-lg px-2 w-36 focus:outline-none"
            value={username}
            placeholder="email"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mb-10 rounded-lg px-2 w-36 mt-5 focus:outline-none"
            value={password}
            type="password"
            placeholder="lozinka"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="focus:outline-none bg-blue-400 px-4 py-1 rounded-lg text-gray-50"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
{
  /*       
      <button className="bg-blue-400 px-4 py-1 rounded-lg text-gray-50">
        register
      </button>
    Photo by <a href="https://unsplash.com/@matosem?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Matosem</a> on <a href="https://unsplash.com/s/photos/business?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    */
}
