import { useParams } from "react-router";

export default function Review() {
  const { title } = useParams();

  return <div>{title}</div>;
}
