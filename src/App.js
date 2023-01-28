import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import "./App.css";
import FlightBookingCard from "./components/FlightBookingCard";
import MultiRangeSlider from "./components/multiRangeSlider/MultiRangeSlider";

function App() {
  const [flightList, setFlightList] = useState([]);
  const departTimes = [
    "00:00 to 05:59",
    "06:00 to 11:59",
    "12:00 to 17:59",
    "18:00 to 23:00",
  ];

  useEffect(() => {
    fetch("http://localhost:5001/flightList")
      .then((response) => response.json())
      .then((data) => setFlightList(data));
  }, []);

  // const { data: flightList = [] } = useQuery({
  //   queryKey: ["flightList"],
  //   queryFn: async () => {
  //     const response = await fetch("http://localhost:5001/flightList");
  //     const data = await response.json();

  //     return data;
  //   },
  // });

  const { data: airLines = [] } = useQuery({
    queryKey: ["airLines"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5001/airLines");
      const data = await response.json();
      return data;
    },
  });

  // airline filter
  const airLinesHandler = (event) => {
    setFlightList([]);
    if (event.target.checked) {
      fetch(`http://localhost:5001/airLines/${event.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          setFlightList(data);
        });
    }
  };

  //depart time filter
  const departTimesHandler = (event) => {
    setFlightList([]);
    if (event.target.checked) {
      fetch(`http://localhost:5001/departTimes/${event.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          setFlightList(data);
        });
    }
  };

  //price filter
  const priceFilterHandler = (min, max) => {
    const value = `${min},${max}`;
    console.log(value);
    fetch(`http://localhost:5001/priceFilter/${value}`)
    .then((response) => response.json())
    .then((data) =>  setFlightList(data));
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <section className="py-6 sm:py-12 bg-white text-gray-900">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold"> Air Tickets</h2>
            <p className="font-serif text-sm text-gray-400">
              Book Your Tickets Now!
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div>
              <div className="w-full shadow p-5 rounded-lg bg-white">
                <div className="relative">
                  <div className="absolute flex items-center ml-2 h-full">
                    <svg
                      className="w-4 h-4 fill-current text-primary-gray-dark"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                    </svg>
                  </div>

                  <input
                    type="text"
                    placeholder="Search by listing, location, bedroom number..."
                    className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="font-medium">Filters</p>

                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                    Reset Filter
                  </button>
                </div>

                <div>
                  <h2 className="text-md font-bold ">Airlines</h2>
                  <form className="grid grid-cols-1 gap-2 ">
                    {airLines.map((airLine, idx) => (
                      <div>
                        <input
                          onChange={(e) => airLinesHandler(e)}
                          type="checkbox"
                          id={idx}
                          value={airLine}
                        />
                        <label htmlFor={idx}> {airLine}</label>
                      </div>
                    ))}
                  </form>
                </div>

                <div className="my-3">
                  <h2 className="text-md font-bold ">Depart Time</h2>
                  <form className="grid grid-cols-1 gap-4 ">
                    {departTimes.map((departTime, id) => (
                      <div>
                        <input
                          onChange={(e) => departTimesHandler(e)}
                          type="checkbox"
                          id={id + 5}
                          value={departTime}
                        />
                        <label htmlFor={id + 5}> {departTime}</label>
                      </div>
                    ))}
                  </form>
                </div>

                <div className="my-3">
                  <h2 className="text-md font-bold mb-8">Price Filter</h2>
                  <MultiRangeSlider
                    min={3359}
                    max={5113}
                    onChange={({ min, max }) => priceFilterHandler(min, max)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-[90%] ">
              {flightList.map((flight) => (
                <FlightBookingCard
                  key={flight.id}
                  flight={flight}
                ></FlightBookingCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
