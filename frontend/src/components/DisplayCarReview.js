/**
 * Displays a car review
 * @param {*} param0 represents a car review object
 * @returns A JSX element that contains a car review being displayed
 */
export default function DisplayCarReview({ carReview }) {
  return (
    <div>
      {carReview && (
        <div className="bg-white m-4 rounded text-black p-4 flex flex-col">
          <h1 className="font-bold">Title: {carReview.title}</h1>
          <p className="font-bold">Description: {carReview.description}</p>
          <p className="font-bold">Score: {carReview.score}</p>
        </div>
      )}
    </div>
  );
}
