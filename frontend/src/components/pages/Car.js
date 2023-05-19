import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShowCar from "../ShowCar";

export default function Car() {
  const { make, model, year } = useParams();
  const [car, setCar] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    async function getCar() {
      const response = await fetch(
        `http://localhost:1339/cars/${make}/${model}/${year}`
      );
      const car = await response.json();
      setResponse(response);
      return car;
    }
    async function fetchData() {
      const car = await getCar();
      setCar(car);
    }
    fetchData();
  }, [make, model, year]);

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-screen">
      <div className="flex flex-col shadow-lg bg-black w-auto m-2 rounded-lg p-4 h-auto text-white">
        {response.status >= 400 ? (
          <div>{car.errorMessage}</div>
        ) : (
          <ShowCar car={car} />
        )}
      </div>
    </div>
  );
}
