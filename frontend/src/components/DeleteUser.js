import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Page for updating a user's username.
 * @page
 */
export default function DeleteUsername() {
  const navigate = useNavigate();
  const [usernameToDelete, setusernameToDelete] = useState("");

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Delete Username
      </h1>

      <form
        className="flex flex-col font-bold items-center bg-white py-16 rounded-lg shadow-lg"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };

          const response = await fetch(
            `http://localhost:1339/${usernameToDelete}`, 
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
        <label htmlFor="usernameToDelete">Username to delete</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="New Username"
          value={usernameToDelete}
          onChange={(event) => {
            setusernameToDelete(event.target.value);
          }}
          required
        />

        <button
          className="bg-white text-black px-12 py-2 rounded-lg font-semibold hover:text-white hover:bg-black border border-black hover:border-white"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}