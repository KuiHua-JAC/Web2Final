import { useParams } from "react-router";

export default function Car() {
  const { make, model, year } = useParams(); //TODO fetch a real car, and give appropriate response if the car is not found.x

  return (
    <div>
      {make} {model} {year}
    </div>
  );
}
