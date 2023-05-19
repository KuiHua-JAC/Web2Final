import { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function DarkModeToggle() {
  const [cookies, setCookies] = useCookies(["darkMode"]);

  const toggleDarkMode = () => {
    setCookies("darkMode", cookies.darkMode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setCookies("darkMode", !cookies.darkMode ? "dark" : "light");
  }, []);

  return (
    <button
      className="bg-black text-white py-4 px-16 rounded-lg font-bold hover:bg-white hover:text-black"
      onClick={toggleDarkMode}
    >
      {cookies.darkMode}
    </button>
  );
}
