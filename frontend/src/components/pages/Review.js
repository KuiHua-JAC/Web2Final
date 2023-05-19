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
    <div className="flex flex-col shadow-lg bg-white h-full w-auto m-2 rounded-lg p-4 overflow-hidden hover:border-2 hover:border-black ">
      <div className="h-1/2">
        <img
          className="object-cover h-full w-full rounded-lg shadow-xl max-h-[400px]"
          src={"../../img/audietrongt.jpg"}
          alt="Ken block audi etron gt"
        />
      </div>
      <div className="mt-8 h-1/2">
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
      </div>
    </div>
  );
}
