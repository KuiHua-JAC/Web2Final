//Aymeric Code

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component form to allow a user to login
 * @component
 */
export default function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white rounded-lg shadow-lg p-4 flex flex-col mt-8">
      <h1 className=" text-center font-bold mb-4">Log in</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "GET",
            body: JSON.stringify({
              password: password,
              username: username,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };

          const response = await fetch(
            `http://localhost:1339/session/login`,
            requestOptions
          );
          const result = await response.json();
          if (response.status >= 400) {
            navigate("/", {
              state: { response: result },
            });
          }
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
          type="text"
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
