// Kui Hua's code

import Alert from "../Alert";
import { useState, useEffect } from "react";
import Post from "../Post";
import { useLocation, useNavigate } from "react-router-dom";
import { LoggedInContext } from "../App";
import { useContext } from "react";

export default function Reviews() {
  const { state } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);
  const [postSearch, setPostSearch] = useState("");

  useEffect(() => {
    async function getAllPosts() {
      try {
        let response = await fetch(`http://localhost:1339/reviews`);
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    async function fetchData() {
      const posts = await getAllPosts();
      setRecentPosts(posts);
    }
    fetchData();
  }, []);

  return (
    <div>
      {state && state.response && <Alert response={state.response} />}
      <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-auto">
        <main>
          <div className="mb-16 p-6">
            <h1 className="text-center text-5xl font-bold mb-8 capitalize">
              individual post search
            </h1>
            <form
              className="flex w-full"
              onSubmit={() => {
                navigate(`/reviews/${postSearch}`);
              }}
            >
              <input
                type="text"
                onChange={(event) => {
                  setPostSearch(event.target.value);
                }}
                className="w-11/12 rounded-lg shadow-lg capitalize font-medium"
              />
              <button
                disabled={!postSearch} // regex taken from chatgpt
                className="w-36 disabled:bg-gray-500 disabled:text-white disabled:border-0 bg-black rounded-lg shadow-lg text-white font-medium ml-4 hover:bg-white hover:text-black hover:border-2 hover:border-black"
              >
                Search
              </button>
            </form>
          </div>
          <div>
            <div className="flex justify-between items-center mx-6">
              <h1 className="text-center text-5xl font-bold capitalize italic text-black">
                All posts
              </h1>
              <div className="flex justify-center items-center ">
                {isLoggedIn && (
                  <a
                    href="/reviews/add"
                    className="pb-1 h-14 w-14 bg-gray-100 rounded-full text-green-600 flex justify-center border-2 border-green-600 items-center hover:bg-green-600 hover:text-white text-2xl"
                  >
                    +
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-center flex-wrap mt-8">
              {recentPosts.length === 0 ? (
                <p className="font-bold text-lg">No posts available.</p>
              ) : (
                recentPosts.map((post) => <Post post={post} />)
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
