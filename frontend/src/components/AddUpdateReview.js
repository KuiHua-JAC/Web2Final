import { useNavigate } from "react-router";
export default function AddUpdateReview({ review }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-evenly mt-16">
      <button
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/reviews/update/${review.title}`);
        }}
        className="bg-black text-white px-12 py-2 rounded-lg font-semibold hover:text-black hover:bg-white hover:border hover:border-black"
      >
        Update
      </button>
      <button
        onClick={async (event) => {
          event.stopPropagation();
          const response = await fetch(
            `http://localhost:1339/reviews/${review.title}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) navigate(`/reviews/`);
        }}
        className="bg-black text-white px-12 py-2 rounded-lg font-semibold hover:text-black hover:bg-white hover:border hover:border-black"
      >
        Delete
      </button>
    </div>
  );
}
