import DeleteCarReview from "../DeleteCarReview";
import GetCarReview from "../GetCarReview";
import GetAllCarReviews from "../GetAllCarReviews";
import UpdateCarReview from "../UpdateCarReview";
import AddCarReview from "../AddCarReview";
import Alert from "../Alert";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { state } = useLocation();
  return (
    <div>
      {state && state.response && <Alert response={state.response} />}
      <main className="px-4 py-10 bg-red-700  ">
        <GetCarReview />
        <AddCarReview />
        <GetAllCarReviews />
        <UpdateCarReview />
        <DeleteCarReview />
      </main>
    </div>
  );
}
