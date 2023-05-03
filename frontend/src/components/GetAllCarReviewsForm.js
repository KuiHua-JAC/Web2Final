import { useNavigate } from "react-router-dom";
/**
 * Form that contains a button to fetch a list of reviews of the database.
 * @param {*} props A function that sets the result of the form submission's fetch, which is an array of car reviews
 * @returns A JSX element
 */
export default function GetAllCarReviewsForm(props) {
  const navigate = useNavigate();
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:1339/reviews", {
          method: "GET",
        });

        const result = await response.json();
        if (response.status >= 400) {
          navigate("/", {
            state: { response: result },
          });
        }
        props.setReviews(result);
      }}
    >
      <h1 className="text-center font-bold mb-4">Get all car reviews</h1>
      <button
        className="mt-4 border rounded border-white hover:text-black hover:bg-white w-1/2"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
