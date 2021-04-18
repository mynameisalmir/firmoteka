import React, { useState } from "react";
import UserPool from "app/UserPool";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState()

  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
// if koji provjerava je li kognito user postavljane, ako nije null da pravi kognito usera sa null vrijednostima
  var cognitoUser = {};
console.log("render");
  const onSubmit1 = (e) => {
    e.preventDefault();
    console.log(cognitoUser);
    cognitoUser.confirmRegistration(code, true, (err, data) => {
      if (err) console.log(err);
      console.log(data);
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    UserPool.signUp(
      name,
      password,
      [
        { Name: "phone_number", Value: phone_number },
        { Name: "name", Value: name },
        { Name: "email", Value: email },
      ],
      null,
      (err, data) => {
        if (err) console.log(err);
        console.log(data);
        cognitoUser = data.user;
      }
    );
  };

  return (
    <div>
      <div className="lg:flex hidden items-center justify-center  min-h-screen">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center shadow-md bg-gray-50 rounded-lg py-20 px-24"
        >
          <p className="text-xl font-bold">Registracija</p>
          <input
            className="mt-10 rounded-lg px-7 py-2 shadow-md focus:outline-none"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-gray-400 text-md">Email</p>
          <input
            className="mt-10 rounded-lg px-7 py-2 shadow-md focus:outline-none"
            value={name}
            type="name"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-gray-400 text-md">Name</p>
          <input
            className="mt-10 rounded-lg px-7 py-2 shadow-md focus:outline-none"
            value={phone_number}
            type="name"
            onChange={(e) => setPhone_number(e.target.value)}
          />
          <p className="text-gray-400 text-md">phone number</p>
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
            Sign up
          </button>
        </form>
      </div>
      <div className="lg:hidden">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center shadow-md bg-gray-50 rounded-lg mt-32 w-60 h-64"
        >
          <p className="text-xl font-bold">Registracija</p>
          <input
            className="mt-10 rounded-lg px-2 w-36 focus:outline-none"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-gray-400 text-md">Email</p>
          <input
            className="mt-10 rounded-lg px-7 py-2 shadow-md focus:outline-none"
            value={name}
            type="name"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-gray-400 text-md">Name</p>
          <input
            className="mt-10 rounded-lg px-7 py-2 shadow-md focus:outline-none"
            value={phone_number}
            type="name"
            onChange={(e) => setPhone_number(e.target.value)}
          />
          <p className="text-gray-400 text-md">phone number</p>
          <input
            className="mb-10 rounded-lg px-2 w-36 mt-5 focus:outline-none"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-gray-400 mb-10 text-md">Lozinka</p>
          <button
            className="bg-blue-400 px-4 py-1 rounded-lg text-gray-50"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
      <div>
        <form onSubmit={onSubmit1}>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>username</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p>kod</p>
          <button
            className="bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-5"
            type="submit"
          >
            go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
{
  /*       
      <button className="bg-blue-400 px-4 py-1 rounded-lg text-gray-50">
        register
      </button> */
}
