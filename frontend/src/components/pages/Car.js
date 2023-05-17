import { useParams } from "react-router";

export default function Car() {
  const { make, model, year } = useParams();

  return (
    <div>
      {make} {model} {year}
    </div>
  );
}
