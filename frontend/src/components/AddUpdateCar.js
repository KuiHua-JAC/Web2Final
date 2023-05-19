import { useNavigate } from "react-router";
export default function AddUdpateCar({ car }) {
  const navigate = useNavigate();
  return (
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
  );
}
