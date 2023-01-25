import React from "react";
import { FaClock } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

const FlightBookingCard = ({ flight }) => {
  const {
    DepartureTime,
    ArrivalTime,
    TravelDuration,
    Equipment,
    OperatingCarrierName,
    CabinClass,
    FareBasis,
  } = flight.Onwards[0];

  return (
    <div className="mb-20 shadow-md p-10">
      <div className="container grid grid-cols-1 md:grid-cols-5 gap-5 item-center mx-auto my-2 space-x-4">
        <div className="flex flex-col items-center">
          <div>
            <img
              className="w-10 h-10 "
              src="https://play-lh.googleusercontent.com/O58aF0wv2kgyxAgTNwnjBvlwC4In4NyHXH0K2UqS1aeAOtdf186xXa7IqHzEjGxEGA"
              alt=""
            />
          </div>
          <p className="text-gray-500 text-center">{Equipment}</p>
          <p className="text-xs text-green-500 text-center font-bold uppercase">
            {OperatingCarrierName}
          </p>
          <p className="text-xs text-center text-green-500 font-bold uppercase">
            (BG611)
          </p>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center">
            <p className=" text-green-500 font-bold uppercase">
              {" "}
              ({flight.Onwards[0].Origin})
            </p>
            <p className="text-xs font-bold text-center uppercase">
              {flight.Onwards[0].OriginAirPortName}
            </p>
            <p className="text-red-500 text-center">{DepartureTime}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <img
            className="w-10 h-10"
            src="https://p.kindpng.com/picc/s/148-1488822_airplane-icon-png-transparent-images-wide-body-aircraft.png"
            alt=""
          />
          <div className="flex justify-center items-center gap-2">
            <p>
              <FaClock></FaClock>
            </p>
            <p>{TravelDuration}</p>
          </div>
          <p className="text-xs text-red-500 font-bold uppercase">
            ----------------------
          </p>
          <p className="text-red-500 text-sm font-bold">Non-stop</p>
          <p>1S</p>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center ">
            <p className=" text-green-500 text-center font-bold uppercase">
              ({flight.Onwards[0].Destination})
            </p>
            <p className="text-xs text-center font-bold uppercase">
              {flight.Onwards[0].DestinationAirPortName}
            </p>
            <p className="text-red-500 text-center">{ArrivalTime}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center ">
          <p className=" text-red-500 font-bold ">
            {" "}
            <s>3706 BDT</s>
          </p>
          <p className="text-xs font-bold uppercase">regular fair</p>
          <p className="text-green-500 font-bold">3,558 BDT*</p>
          <p className="text-green-700 text-xs font-bold">discount fair</p>
          <p className="text-green-500 mt-3 text-center font-bold">
            partial refundable
          </p>
          <button className="btn btn-active bg-red-600  text-white rounded-none my-4">
            Book now
          </button>
        </div>
      </div>

      <div className="my-5 flex justify-between ">
        <div className="flex justify-end items-center">
          <p className="text-red-500 font-bold uppercase mr-6">
            Flight Details
          </p>
          <div className="flex gap-5">
            <div>
              <img
                data-tip={CabinClass}
                className="w-5 h-5"
                src="https://static.vecteezy.com/system/resources/previews/014/935/861/non_2x/handle-briefcase-icon-simple-business-bag-vector.jpg"
                alt=""
              />
              <ReactTooltip />
            </div>

            <div>
              <img
                data-tip={FareBasis}
                className="w-7 h-7"
                src="https://images.vexels.com/media/users/3/148983/isolated/preview/cf860942c28bfe9e8f3e9de4aea965e0-swivel-office-chair-flat-icon.png"
                alt=""
              />
              <ReactTooltip />
            </div>
          </div>
        </div>
        <div>
          <p className="text-green-500 text-sm font-bold uppercase">
            Discount on selected card holders only
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingCard;
