import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
/**
 * Button used for navigating to a route
 * @param {*} props Link to the page route and the name of the button
 * @returns
 */
export default function NavButton(props) {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const active =
    "block py-2 pl-3 pr-4 text-red-700 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-red-700";
  const inactive =
    "block py-2 pl-3 pr-4 text-white hover:text-red-700 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0";
  return (
    <NavLink to={props.to} className="w-full">
      <button className={match ? active : inactive}>{props.label}</button>
    </NavLink>
  );
}
