import Alert from "../Alert";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Car from "../CarCard";

export default function Cars() {
  const { state } = useLocation();
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    async function getAllCars() {
      let response = await fetch(`http://localhost:1339/cars`);
      return await response.json();
    }

    async function fetchData() {
      const posts = await getAllCars();
      setAllCars(posts);
    }
    fetchData();
  }, []);

  const carsToDisplay = allCars.map((car) => <Car car={car} />);
  return (
    <div className="px-4 py-10 bg-red-700 h-full">
      {state && state.response && <Alert response={state.response} />}
      <main>
        <h1 className="text-center text-5xl font-bold">
          Here are the cars in our database
        </h1>
        <div className="flex  justify-center flex-wrap mt-8">
          {carsToDisplay}
        </div>
      </main>
    </div>
  );
}
