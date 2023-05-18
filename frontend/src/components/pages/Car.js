import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Car() {
  const { make, model, year } = useParams(); //TODO fetch a real car, and give appropriate response if the car is not found.x
  const [car, setCar] = useState({});
  useEffect(() => {
    async function getCar() {
      return await (
        await fetch(`http://localhost:1339/cars/${make}/${model}/${year}`)
      ).json();
    }
    async function fetchData() {
      const car = await getCar();
      console.log(car);
      setCar(car);
    }
    fetchData();
  }, [make, model, year]);

  return (
    <div className="bg-gradient-to-b from-red-500 to-red-800">
      <h2>
        {car.make} {car.model} {car.year}
      </h2>
      {car.description}
    </div>
  );
}
