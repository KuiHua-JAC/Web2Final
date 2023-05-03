import { useState } from "react";
import { useNavigate } from "react-router-dom";
/**
 * Deletes a car review with the title in the input field
 * @returns A JSX element containing a form to delete a car review
 */
export default function DeleteCarReview() {
  const [title, setTitle] = useState();
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white rounded p-4 mt-8">
      <div className="flex flex-col">
        <h1 className=" text-center font-bold mb-4">Delete Car Review</h1>
        <form
          className="flex flex-col items-center"
          onSubmit={async (event) => {
            event.preventDefault();

            const requestOptions = {
              method: "delete",
              body: JSON.stringify({
                title: title,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            };

            const response = await fetch(
              `http://localhost:1339/reviews/${title}`,
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
          <input
            className="text-black w-1/2"
            type="text"
            placeholder="title.."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
          {title && (
            <button
              className="mt-4 border rounder border-white hover:text-black hover:bg-white w-1/2"
              type="submit"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
