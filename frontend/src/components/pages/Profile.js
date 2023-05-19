import Cookies from "js-cookie";
import UpdateUsername from "../UpdateUsername";
import LanguageToggle from "../LanguageToggle";
import DarkModeToggle from "../DarkModeToggle";

/**
 * Page for showing a user's profile
 * @page
 */
export default function Profile() {
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-auto">
      <div className="bg-white h-auto rounded-lg shadow-lg p-4">
        <p className="font-bold">Most recent search:</p>
        {Cookies.get("searchQuery")}
        <p className="font-bold mt-8">Choose your language:</p>
        <LanguageToggle />

        <p className="font-bold mt-8">Choose your color mode:</p>
        <DarkModeToggle />
        <UpdateUsername />
      </div>
    </div>
  );
}
