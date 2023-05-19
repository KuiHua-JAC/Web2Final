export default function ShowCar({ car }) {
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
    </div>
  );
}
