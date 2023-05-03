import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Form with input for title description and score to add a car review to the database
 * @returns A JSX element that contains a form to add a car review
 */
export default function AddCarReview() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [score, setScore] = useState();
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white rounded p-4 flex flex-col mt-8">
      <h1 className=" text-center font-bold mb-4">Add a car review</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "post",
            body: JSON.stringify({
              title: title,
              description: description,
              score: score,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };

          const response = await fetch(
            `http://localhost:1339/reviews`,
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
        <label htmlFor="type">Title</label>
        <input
          className="text-black w-1/2 rounded mb-4"
          type="text"
          placeholder="Title.."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />

        <label htmlFor="type">Description</label>
        <input
          className="text-black w-1/2 rounded mb-4"
          type="text"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          required
        />

        <label htmlFor="name">Score</label>
        <input
          className="text-black w-1/2 rounded"
          type="number"
          min={0}
          max={5}
          placeholder="Score.."
          onChange={(event) => {
            setScore(event.target.value);
          }}
          required
        />
        {score && title && description && (
          <button
            className="mt-4 border rounded border-white hover:text-black hover:bg-white w-1/2"
            type="submit"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
}
