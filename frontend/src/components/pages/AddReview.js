import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddReview() {
  useEffect(() => {
    async function getAllCars() {
      let response = await fetch(`http://localhost:1339/cars`);
      return await response.json();
    }

    async function fetchData() {
      const cars = await getAllCars();
      setAllCars(cars);
    }
    fetchData();
  }, []);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [score, setScore] = useState();
  const [allCars, setAllCars] = useState([]);
  const [type, setType] = useState();
  const [car, setCar] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Add a post
      </h1>
      <form
        className="flex flex-col font-bold items-center bg-white py-16 rounded-lg shadow-lg"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "post",
            body: JSON.stringify({
              title: title,
              description: description,
              score: score,
              type: type,
              username: username,
              car: car,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };

          const response = await fetch(
            `http://localhost:1339/reviews`,
            requestOptions
          );
          const result = await response.json();
          if (response.status >= 400) {
            navigate("/", {
              state: { response: result },
            });
          }
        }}
      >
        <label htmlFor="type">Title*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Title.."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />

        <label htmlFor="type">Description*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          required
        />

        <label htmlFor="name">Score*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="number"
          min={0}
          max={5}
          placeholder="Score.."
          onChange={(event) => {
            setScore(event.target.value);
          }}
          required
        />

        <label htmlFor="type">Car*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          list="cars"
          placeholder="Car.."
          onChange={(event) => {
            const carInfo = event.target.value.split(" ");
            setCar({ make: carInfo[0], model: carInfo[1], year: carInfo[2] });
          }}
          required
        />
        <datalist id="cars">
          {allCars.map((option) => (
            <option
              key={option}
              value={`${option.make} ${option.model} ${option.year}`}
            />
          ))}
        </datalist>

        <label htmlFor="type">Type*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Type.."
          onChange={(event) => {
            setType(event.target.value);
          }}
          required
        />

        {/* TODO remove this and instead set the username at the start, when you fetch the user */}
        <label htmlFor="type">Username</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Type.."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />

        {score && title && description && type && car && username && (
          <button
            className="mt-4 border rounded border-white hover:text-black hover:bg-white w-1/2"
            type="submit"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
}
