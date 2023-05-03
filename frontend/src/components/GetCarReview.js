import { useState } from "react";
import GetCarReviewForm from "./GetCarReviewForm";
import DisplayCarReview from "./DisplayCarReview";
/**
 * Contains the form that fetches a car review to then display it
 * @returns A JSX element that contains a form and the display of the car fetched
 */
export default function GetCarReview() {
  const [carReview, setCarReview] = useState();

  return (
    <div className="bg-black text-white rounded p-4">
      <GetCarReviewForm setCarReview={setCarReview} />
      <DisplayCarReview carReview={carReview} />
    </div>
  );
}
