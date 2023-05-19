import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ShowReview from "../ShowReview";

export default function Review() {
  const { title } = useParams();
  const [review, setReview] = useState({});
  const [response, setResponse] = useState({});
  const [car, setCar] = useState({});
  useEffect(() => {
    async function getReview() {
      const response = await fetch(`http://localhost:1339/reviews/${title}`);
      const review = await response.json();
      setReview(review);
      setResponse(response);
      setCar(review.car);
    }
    getReview();
  }, [title]);
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <div className="flex in flex-col shadow-lg bg-white w-auto m-2 rounded-lg p-4">
        {response.status >= 400 ? (
          <div>{review.errorMessage}</div>
        ) : (
          <ShowReview car={car} review={review} />
        )}
      </div>
    </div>
  );
}
