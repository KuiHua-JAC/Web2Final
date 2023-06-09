//Aymeric Code

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "./App";

/**
 * Component form to allow a user to login
 * @component
 */
export default function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white rounded-lg shadow-lg p-4 flex flex-col mt-8">
      <h1 className=" text-center font-bold mb-4">Log in</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={async (event) => {
          try {
          event.preventDefault();
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({
              password: password,
              username: username,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            credentials: 'include'
          };

          const response = await fetch(`http://localhost:1339/session/login`, requestOptions);
          if(response.status === 200) {
            alert("Thanks for logging in");
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

        {password && username && (
          <button
            className="mt-4 border rounded border-white hover:text-black hover:bg-white w-1/2"
            type="submit"
          >
            Log In
          </button>
        )}
      </form>
    </div>
  );
}
