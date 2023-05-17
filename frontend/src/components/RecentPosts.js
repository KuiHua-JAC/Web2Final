import { useState, useEffect } from "react";
import Post from "./PostCard";
export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    async function getRecentPosts() {
      let response = await fetch(`http://localhost:1339/reviews`);
      return await response.json();
    }

    async function fetchData() {
      const posts = await getRecentPosts();

      if (posts.length < 3) {
        setRecentPosts(posts);
      } else {
        setRecentPosts(posts.slice(0, 3));
      }
    }

    fetchData();
  }, []);

  const postsToDisplay = recentPosts.map((post) => <Post post={post} />);

  return (
    <div className="mt-16">
      <h1 className="text-center text-5xl font-bold text-white italic">
        Recent posts
      </h1>
      <div className="flex  justify-center flex-wrap mt-8">
        {postsToDisplay}
      </div>
      ;
    </div>
  );
}
