// Kui Hua's code
import { useNavigate } from "react-router";

/**
 * Component to display the information about a post
 * @component
 */
export default function Post({ post }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col shadow-lg bg-white h-[250px] w-[600px] m-2 rounded-lg p-4 overflow-hidden hover:border-2 hover:border-black ">
      <div className="mt-8 h-1/3">
        <h1 className="font-bold uppercase">{post.title}</h1>
        <p>
          <b>Score: </b> {post.score}
        </p>
        <p
          className="hover:cursor-pointer hover:text-red-600"
          onClick={() => {
            navigate(
              `/cars/${post.car.make}/${post.car.model}/${post.car.year}`
            );
          }}
        >
          <b>Car:</b> {post.car.make} {post.car.model} {post.car.year}
        </p>
        <p>
          <b>Type: </b>
          {post.type}
        </p>
        <div className="flex justify-center h-1/3">
          <button
            className="uppercase text-white bg-black font-semibold px-8 rounded-lg hover:text-red-500 hover:bg-white hover:border hover:border-black"
            onClick={() => {
              navigate(`/reviews/${post.title}`);
            }}
          >
            View post
          </button>
        </div>
      </div>
    </div>
  );
}
