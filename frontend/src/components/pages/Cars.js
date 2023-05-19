import Alert from "../Alert";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Car from "../CarCard";

export default function Cars() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [allCars, setAllCars] = useState([]);
  const [carSearch, setCarSearch] = useState("");

  useEffect(() => {
    async function getAllCars() {
      let response = await fetch(`http://localhost:1339/cars`);
      return await response.json();
    }

    async function fetchData() {
      const cars = await getAllCars();
      setAllCars(cars);
    }
    fetchData();
  }, []);

  const carsToDisplay = allCars.map((car) => <Car car={car} />);
  return (
    <div>
      {state && state.response && <Alert response={state.response} />}
      <div className="px-4 py-10 bg-gradient-to-b from-red-500 to-red-800 h-full">
        <main>
          <div className="mb-16 p-6">
            <h1 className="text-center text-5xl font-bold mb-8 capitalize">
              Individual Car Search
            </h1>
            <form
              className="flex w-full"
              onSubmit={() => {
                const searchQuery = carSearch;
                const make = carSearch.split(" ")[0];
                const model = carSearch.split(" ")[1];
                const year = carSearch.split(" ")[2];

                Cookies.set("searchQuery", searchQuery);

                navigate(`/cars/${make}/${model}/${year}`);
              }}
            >
              <input
                type="text"
                onChange={(event) => {
                  setCarSearch(event.target.value);
                }}
                className="w-11/12 rounded-lg shadow-lg capitalize font-medium"
              />
              <button
                disabled={
                  !(
                    carSearch &&
                    carSearch.split(" ").length === 3 &&
                    /^[a-zA-Z]+\s[a-zA-Z]+\s\d{4}$/.test(carSearch)
                  )
                } // regex taken from chatgpt
                className="w-36 disabled:bg-gray-500 disabled:text-white disabled:border-0 bg-black rounded-lg shadow-lg text-white font-medium ml-4 hover:bg-white hover:text-black hover:border-2 hover:border-black"
              >
                Search
              </button>
            </form>
          </div>
          <div>
            <div className="flex justify-between items-center mx-6">
              <h1 className="text-center text-5xl font-bold capitalize italic text-white">
                All cars
              </h1>
              <div className="flex justify-center items-center ">
                <a
                  href="/cars/add"
                  className="pb-1 h-14 w-14 bg-gray-100 rounded-full text-green-600 flex justify-center border-2 border-green-600 items-center hover:bg-green-600 hover:text-white text-2xl"
                >
                  +
                </a>
              </div>
            </div>
            <div className="flex justify-center flex-wrap mt-8">
              {carsToDisplay}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
