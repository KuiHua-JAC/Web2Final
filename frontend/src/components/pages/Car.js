import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Car() {
  const { make, model, year } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    async function getCar() {
      return await (
        await fetch(`http://localhost:1339/cars/${make}/${model}/${year}`)
      ).json();
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
        <div className="">
          <img
            className="object-contain h-full w-full rounded-lg shadow-xl max-h-[600px] object-center bg-black"
            src={`https://source.unsplash.com/random/?${car.make}`}
            alt="Ken block audi etron gt"
          />
        </div>
        <div className="mt-8">
          <h1 className="font-bold uppercase">
            {car.make} {car.model} {car.year}
          </h1>
          <p>
            <b>Description: </b>
            {car.description}
          </p>
        </div>
      </div>
    </div>
  );
}
