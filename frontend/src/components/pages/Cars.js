import Alert from "../Alert";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      const posts = await getAllCars();
      setAllCars(posts);
    }
    fetchData();
  }, []);

  const carsToDisplay = allCars.map((car) => <Car car={car} />);
  return (
    <div className="px-4 py-10 bg-red-700 h-full">
      {state && state.response && <Alert response={state.response} />}
      <main>
        <div className="mb-8 p-6">
          <h1 className="text-center text-5xl font-bold mb-4">
            Search for a particular car
          </h1>
          <form
            className="flex w-full"
            onSubmit={() => {
              const make = carSearch.split(" ")[0];
              const model = carSearch.split(" ")[1];
              const year = carSearch.split(" ")[2];

              navigate(`/cars/${model}/${make}/${year}`);
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
              className="w-1/12 disabled:bg-gray-500 disabled:text-white disabled:border-0 bg-black rounded-lg shadow-lg text-white font-medium ml-4 hover:bg-white hover:text-black hover:border-2 hover:border-black"
            >
              Search
            </button>
          </form>
        </div>
        <div>
          <h1 className="text-center text-5xl font-bold">All cars</h1>
          <div className="flex justify-center flex-wrap mt-8">
            {carsToDisplay}
          </div>
        </div>
      </main>
    </div>
  );
}
