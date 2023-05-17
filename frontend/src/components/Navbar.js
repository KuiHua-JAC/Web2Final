import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";

$(window).resize(function () {
  // Get the current window width
  var windowWidth = $(window).width();
  if (windowWidth > 768) $("#navbar-default").show();
  else $("#navbar-default").hide();
});
// This code's style was taken from flowbite, however the logic is from me
/**
 * Navbar that is used to navigate through the different routes
 * @returns A JSX element representing a navbar
 */
export default function Navbar() {
  const navigate = useNavigate();
  const { state } = useLocation(); //TODO keep track of the signin state
  return (
    <nav className="border-gray-200 bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            AutoFinder
          </span>
        </button>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            $("#navbar-default").toggle();
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden max-h-4 w-full md:block md:w-7/12"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-black md:dark:bg-black dark:border-gray-700">
            <NavButton to="/" label="Home" />
            <NavButton to="/cars" label="Cars" />
            <NavButton to="/reviews" label="Reviews" />
            <NavButton to="/profile" label="Profile" />
            <NavButton to="/signin" label="Sign in" />
          </ul>
        </div>
      </div>
      <script src="node_modules/flowbite/dist/flowbite.min.js"></script>
    </nav>
  );
}
