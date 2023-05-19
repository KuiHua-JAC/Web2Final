// Kui Hua's code
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Page for updating a car's description.
 * @page
 */
export default function UpdateCar() {
  const { make, model, year } = useParams();
  const navigate = useNavigate();
  const [newMake, setMake] = useState("");
  const [newModel, setModel] = useState("");
  const [newYear, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //TODO add admin check to enable update

  useEffect(() => {
    async function getCar() {
      try {
        const response = await fetch(
          `http://localhost:1339/cars/${make}/${model}/${year}`
        );
        if (response.ok) {
          const carData = await response.json();
          setMake(carData.make);
          setModel(carData.model);
          setYear(carData.year);
          setDescription(carData.description);
          setImageUrl(carData.image);
        } else {
          throw new Error("Failed to fetch car");
        }
      } catch (error) {
        console.error(error);
      }
    }

    getCar();
  }, [make, model, year]);

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <h1 className="text-center text-5xl font-bold capitalize italic text-black mb-16">
        Update Car
      </h1>

      <form
        className="flex flex-col font-bold items-center bg-white py-16 rounded-lg shadow-lg"
        onSubmit={async (event) => {
          event.preventDefault();
          const requestOptions = {
            method: "put",
            body: JSON.stringify({
              make: newMake,
              model: newModel,
              year: newYear,
              description: description,
              image: imageUrl,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };
          // The make,model and year aren't really changed, hence we can use the
          const response = await fetch(
            `http://localhost:1339/cars/${newMake}/${newModel}/${newYear}`,
            requestOptions
          );
          const result = await response.json();
          if (response.ok) navigate(`/cars/${newMake}/${newModel}/${newYear}`);
          else
            navigate("/", {
              state: { response: result },
            });
        }}
      >
        <label htmlFor="make">Make*</label>
        <input
          disabled
          className="text-black w-1/2 rounded-lg shadow-lg mb-4 bg-gray-300"
          type="text"
          placeholder="Make.."
          value={newMake}
        />

        <label htmlFor="model">Model*</label>
        <input
          disabled
          className="text-black w-1/2 rounded-lg shadow-lg mb-4 bg-gray-300"
          type="text"
          placeholder="Model"
          value={newModel}
        />

        <label htmlFor="year">Year</label>
        <input
          disabled
          className="text-black w-1/2 rounded-lg shadow-lg mb-4 bg-gray-300"
          type="number"
          placeholder="Year.."
          value={newYear}
        />

        <label htmlFor="description">Description*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          required
        />

        <label htmlFor="imageUrl">Image*</label>
        <input
          className="text-black w-1/2 rounded-lg shadow-lg mb-4"
          type="text"
          placeholder="Image url"
          value={imageUrl}
          onChange={(event) => {
            setImageUrl(event.target.value);
          }}
          required
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
