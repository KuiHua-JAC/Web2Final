//TODO add admin check to enable update and delete
import { useNavigate } from "react-router";
export default function ShowCar({ car }) {
  const navigate = useNavigate();
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

      {/* TODO right now it's always rendered, but make it a conditional rendering based on if admin or not */}
      <div className="flex justify-evenly mt-16">
        <button
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/cars/update/${car.make}/${car.model}/${car.year}`);
          }}
          className="bg-white text-black px-12 py-2 rounded-lg font-semibold hover:text-white hover:bg-black hover:border hover:border-white"
        >
          Update
        </button>
        <button
          onClick={async (event) => {
            event.stopPropagation();
            const response = await fetch(
              `http://localhost:1339/cars/${car.make}/${car.model}/${car.year}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) navigate(`/cars/`);
          }}
          className="bg-white text-black px-12 py-2 rounded-lg font-semibold hover:text-white hover:bg-black hover:border hover:border-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
