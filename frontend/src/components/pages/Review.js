import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Review() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({});
  const [car, setCar] = useState({});
  useEffect(() => {
    async function getReview() {
      const review = await (
        await fetch(`http://localhost:1339/reviews/${title}`)
      ).json();
      setReview(review);
      setCar(review.car);
      console.log(review);
    }
    getReview();
  }, [title]);
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <div className="flex in flex-col shadow-lg bg-white w-auto m-2 rounded-lg p-4">
        <div className="">
          <img
            className="object-contain h-full w-full rounded-lg shadow-xl max-h-[600px] object-center bg-black"
            src={`https://source.unsplash.com/random/?${car.make}`}
            alt="Ken block audi etron gt"
          />
        </div>
        <div className="mt-8">
          <h1 className="font-bold uppercase">{review.title}</h1>
          <p>
            <b>Score: </b> {review.score}
          </p>
          <p>
            <b>Description: </b>
            {review.description}
          </p>
          <p
            className="hover:cursor-pointer hover:text-red-600"
            onClick={() => {
              navigate(`/cars/${car.make}/${car.model}/${car.year}`);
            }}
          >
            <b>Car: </b> {car.make} {car.model} {car.year}
          </p>
          <p>
            <b>Type: </b>
            {review.type}
          </p>
          <p>
            <b>By: </b>
            {review.username}
          </p>
        </div>
      </div>
    </div>
  );
}
