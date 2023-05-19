import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateReview() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [newTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");
  const [car, setCar] = useState({});

  useEffect(() => {
    async function getReview() {
      const response = await fetch(`http://localhost:1339/reviews/${title}`);
      const review = await response.json();
      setTitle(review.title);
      setDescription(review.description);
      setScore(review.score);
      setCar(review.car);
    }

    getReview();
  }, [title]);

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Update Review
      </h1>
      <form
        className="flex flex-col font-bold items-center bg-white py-16 rounded-lg shadow-lg"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
              newTitle: newTitle,
              description: description,
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
          const result = await response.json();

          if (response.ok) {
            navigate(`/reviews/${newTitle}`);
          } else
            navigate("/", {
              state: { response: result },
            });
        }}
      >
        <label htmlFor="title">New title:</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          value={newTitle}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="score">Score:</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <label htmlFor="car">Car:</label>
        <input
          disabled
          className="text-black w-1/2 rounded-lg shadow-lg mb-4 bg-gray-300"
          type="text"
          // What gets submitted remains the car object
          value={`${car.make} ${car.model} ${car.year}`}
        />
        <button
          className="bg-white text-black px-12 py-2 rounded-lg font-semibold hover:text-white hover:bg-black border border-black hover:border-white"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}
