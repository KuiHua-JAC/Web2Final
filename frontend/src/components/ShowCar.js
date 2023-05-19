// Kui Hua's code
import AddUdpateCar from "./AddUpdateCar";
import { LoggedInContext } from "./App";
import { useContext } from "react";
/**
 * Component that displays a specific car. Authorized users can either edit or delete
 * @component
 */
export default function ShowCar({ car }) {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  return (
    <div>
      <div className="">
        <img
          className="object-contain h-full w-full rounded-lg shadow-xl max-h-[600px] object-center bg-black"
          src={car.image}
          alt="car"
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

      {isLoggedIn && <AddUdpateCar car={car} />}
    </div>
  );
}
