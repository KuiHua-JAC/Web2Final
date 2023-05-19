import { useNavigate } from "react-router";

/**
 * Component that displays a specific car post/review. Authorized users can either edit or delete
 * @component
 */
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
      {/* TODO right now it's always rendered, but make it a conditional rendering based on if it belongs to the user or not. post has a field to match the user */}
      <div className="flex justify-evenly mt-16">
        <button
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/reviews/update/${review.title}`);
          }}
          className="bg-black text-white px-12 py-2 rounded-lg font-semibold hover:text-black hover:bg-white hover:border hover:border-black"
        >
          Update
        </button>
        <button
          onClick={async (event) => {
            event.stopPropagation();
            const response = await fetch(
              `http://localhost:1339/reviews/${review.title}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) navigate(`/reviews/`);
          }}
          className="bg-black text-white px-12 py-2 rounded-lg font-semibold hover:text-black hover:bg-white hover:border hover:border-black"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
