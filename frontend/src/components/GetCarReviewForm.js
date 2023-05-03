import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A form that takes in a score in to fetch a review and set it in a parent component.
 * @param {*} props A function to set a car review in a parent component
 * @returns A JSX element that contains a form to get a car review
 */
export default function GetCarReviewForm(props) {
  const [score, setScore] = useState();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <h1 className=" text-center font-bold mb-4">Get car review from score</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch(
            `http://localhost:1339/reviews/${score}`
          );
          const carReview = await response.json();

          if (response.status >= 400) {
            navigate("/", {
              state: { response: carReview },
            });
          }
          props.setCarReview(carReview);
        }}
      >
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
        {score && (
          <button
            className="mt-4 border rounder border-white hover:text-black hover:bg-white w-1/2"
            type="submit"
          >
            Search
          </button>
        )}
      </form>
    </div>
  );
}
