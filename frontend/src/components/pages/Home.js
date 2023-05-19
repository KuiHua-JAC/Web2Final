import Alert from "../Alert";
import RecentPosts from "../RecentPosts";
import { useLocation } from "react-router-dom";

/**
 * Home page
 * @page
 */
export default function Home() {
  const { state } = useLocation();
  return (
    <div>
      {state && state.response && <Alert response={state.response} />}
      <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-full">
        <main>
          <div className="flex items-center flex-col">
            <h1 className="text-5xl font-bold">Welcome to AutoFinder</h1>
            <h2 className="mt-8 text-lg uppercase font-bold italic text-white">
              The encyclopedia for all cars
            </h2>
          </div>
          <div className="mt-16 flex justify-center w-full">
            <img
              className="w-full rounded-lg shadow-xl"
              src={"../../img/audietrongt.jpg"}
              alt="Ken block audi etron gt"
            />
          </div>
          <div>{<RecentPosts />}</div>
        </main>
      </div>
    </div>
  );
}
