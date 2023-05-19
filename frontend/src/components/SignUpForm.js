//Aymeric Code

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "./App";

/**
 * Component form to allow a user to sign up
 * @component
 */
export default function SignUp() {
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white shadow-lg rounded-lg p-4 flex flex-col mt-8">
      <h1 className=" text-center font-bold mb-4">Sign up</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={async (event) => {
            try {
          event.preventDefault();
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              username: username,
              isAdmin: false,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            credentials: 'include'
          };


          await fetch("http://localhost:1339/user", requestOptions);
          const response1 = await fetch(`http://localhost:1339/session/login`, requestOptions);
          if(response1.status === 200) {
            alert("Thanks for Signing up");
            setIsLoggedIn(true);
            navigate("/");
          } else {
            setIsLoggedIn(false);
            alert("Invalid login, try again");
          }
        } catch (error) {alert("An error occured, try again")}
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          className="text-black w-1/2 rounded mb-4"
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />

        <label htmlFor="firstName">First Name</label>
        <input
          className="text-black w-1/2 rounded mb-4"
          type="text"
          placeholder="First Name"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          className="text-black w-1/2 rounded mb-4"
          type="text"
          placeholder="Last Name"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          className="text-black w-1/2 rounded"
          type="text"
          placeholder="Email.."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className="text-black w-1/2 rounded"
          type="password"
          placeholder="Password.."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />

        {email && password && firstName && lastName && username && (
          <button
            className="mt-4 border rounded border-white hover:text-black hover:bg-white w-1/2"
            type="submit"
          >
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
}
