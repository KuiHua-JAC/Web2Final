import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Page for updating a user's username.
 * @page
 */
export default function UpdateUsername() {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [oldUsername, setOldUsername] = useState("");

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Update Username
      </h1>

      <form
        className="flex flex-col font-bold items-center bg-white py-16 rounded-lg shadow-lg"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
              newUsername: newUsername
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };

          const response = await fetch(
            `http://localhost:1339/updateName/${oldUsername}`, 
            requestOptions
          );
          if(response.status === 200) {
            alert("Username updated succeffully!");
            console.log("Username updated succeffully!")
          } else {
            alert("Error while upating the username");
            console.log("Error while upating the username")
          }
        }}
      >
        <label htmlFor="oldUsername">Old Username*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Old Username"
          value={oldUsername}
          onChange={(event) => {
            setOldUsername(event.target.value);
          }}
          required
        />

        <label htmlFor="newUsername">New Username*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(event) => {
            setNewUsername(event.target.value);
          }}
          required
        />

        <button
          className="bg-white text-black px-12 py-2 rounded-lg font-semibold hover:text-white hover:bg-black border border-black hover:border-white"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}