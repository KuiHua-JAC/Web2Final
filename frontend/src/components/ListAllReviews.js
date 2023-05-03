import DisplayCarReview from "./DisplayCarReview";
/**
 * Displays all the car reviews passed to it
 * @param {*} param0 represents the array of reviews to be displayed
 * @returns A JSX element that shows components DisplayCarReview
 */
export default function ListAllReviews({ reviews }) {
  console.log(reviews);
  const reviewCards = reviews.map((review, index) => (
    <DisplayCarReview key={index} carReview={review} />
  ));
  return <div className="flex flex-wrap">{reviewCards}</div>;
}
