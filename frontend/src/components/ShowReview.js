import { useNavigate } from "react-router";

export default function ShowReview({ car, review }) {
  const navigate = useNavigate();
  return (
    <div>
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
  );
}
