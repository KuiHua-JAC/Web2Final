import { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function LanguageToggle() {
  const [cookies, setCookies] = useCookies(["lang"]);

  const toggleLanguage = () => {
    setCookies("lang", cookies.lang === "EN" ? "FR" : "EN");
  };

  useEffect(() => {
    setCookies("lang", !cookies.lang ? "FR" : cookies.lang);
  }, []);

  return (
    <button
      className="bg-black text-white py-4 px-16 rounded-lg font-bold hover:bg-white hover:text-black"
      onClick={toggleLanguage}
    >
      {cookies.lang}
    </button>
  );
}
