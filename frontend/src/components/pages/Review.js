import { useParams } from "react-router";

export default function Review() {
  const { title } = useParams();

  return (
    <div className="bg-gradient-to-b from-red-500 to-red-800">{title}</div>
  );
}
