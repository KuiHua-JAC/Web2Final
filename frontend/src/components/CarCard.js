import { useNavigate } from "react-router";
export default function Car({ car }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col shadow-lg bg-black h-[400px] w-[600px] m-2 rounded-lg p-4 overflow-hidden hover:border-2 hover:border-white hover:cursor-pointer"
      onClick={() => {
        navigate(`/cars/${car.make}/${car.model}/${car.year}`); //TODO put correct path and add navigation
      }}
    >
      <div className="h-1/2">
        {/* make a component to generate car images */}
        <img
          className="object-cover h-full w-full rounded-lg shadow-xl"
          src={car.image}
          alt="Ken block audi etron gt"
        />
      </div>

      <div className="flex h-1/2 justify-center items-center">
        <h1 className="text-white text-center mt-8 font-bold uppercase">
          {car.make} {car.model} {car.year}
        </h1>
      </div>
    </div>
  );
}
