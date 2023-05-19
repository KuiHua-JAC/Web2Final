// Kui Hua's code
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { useCookies } from "react-cookie";
/**
 * Button used for navigating to a route
 * @param {*} props Link to the page route and the name of the button
 */
export default function NavButton(props) {
  const [cookies, setCookie] = useCookies(["darkMode"]);
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const active =
    "block py-2 pl-3 pr-4 text-red-700 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-red-700";
  const inactive =
    cookies.darkMode === "dark"
      ? "block py-2 pl-3 pr-4 text-white hover:text-red-700 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0"
      : "block py-2 pl-3 pr-4 text-black hover:text-red-700 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0";
  return (
    <NavLink to={props.to} className="w-full">
      <button className={match ? active : inactive}>{props.label}</button>
    </NavLink>
  );
}
