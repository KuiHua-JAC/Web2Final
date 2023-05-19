import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCar() {
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [isAdmin, setIsAdmin] = useState(); // TODO admin check
  const navigate = useNavigate();
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Add a car
      </h1>

      <form
        className="flex flex-col font-bold items-center bg-white py-16 rounded-lg shadow-lg"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "post",
            body: JSON.stringify({
              make: make,
              model: model,
              year: year,
              description: description,
              image: image,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };

          const response = await fetch(
            `http://localhost:1339/cars`,
            requestOptions
          );
          const result = await response.json();
          if (response.ok)
            navigate(`http://localhost:1339/cars/${make}/${model}/${year}`);
          else
            navigate("/", {
              state: { response: result },
            });
        }}
      >
        <label htmlFor="type">Make*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Make.."
          onChange={(event) => {
            setMake(event.target.value);
          }}
          required
        />

        <label htmlFor="type">Model*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Model"
          onChange={(event) => {
            setModel(event.target.value);
          }}
          required
        />

        <label htmlFor="name">Year*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="number"
          min={1886}
          max={new Date().getFullYear() + 1}
          placeholder="Year.."
          onChange={(event) => {
            setYear(event.target.value);
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

        <label htmlFor="type">Image*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Image url"
          onChange={(event) => {
            setImage(event.target.value);
          }}
          required
        />

        {/* ADD isAdmin, to only render the button if the guy is an admin */}
        {make && model && year && image && description && (
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
