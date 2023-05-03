import { useState } from "react";
import GetAllCarReviewsForm from "./GetAllCarReviewsForm";
import ListAllReviews from "./ListAllReviews";

/**
 * Gets and lists all car reviews
 * @returns A JSX element that contains a form and a display for listing all car reviews
 */
export default function GetAllCarReviews() {
  const [reviews, setReviews] = useState([]);
  return (
    <div className="bg-black text-white rounded p-4 mt-8">
      <GetAllCarReviewsForm setReviews={setReviews} />
      <ListAllReviews reviews={reviews} />
    </div>
  );
}
