import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A form with title and score fields, to update a title to a new score.
 * @returns A JSX element form to update the a car review
 */
export default function UpdateCarReview() {
  const [score, setScore] = useState();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white rounded p-4 flex flex-col mt-8">
      <h1 className=" text-center font-bold mb-4">Update a car review</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "put",
            body: JSON.stringify({
              score: score,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };
          const response = await fetch(
            `http://localhost:1339/reviews/${title}`,
            requestOptions
          );
          navigate("/", {
            state: { response: response },
          });
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

        <label htmlFor="name">New score</label>
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
        {score && title && (
          <button
            className="mt-4 border rounded border-white hover:text-black hover:bg-white w-1/2"
            type="submit"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
}
