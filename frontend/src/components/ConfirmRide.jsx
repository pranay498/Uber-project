import React from "react";

const vehicleImages = {
  car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
  moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_312,w_468/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange.png",
  auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_312,w_468/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto.png",
};

const ConfirmRide = ({
 createRide,
  pickup,
  destination,
  fare,
  vehicleType,
  setConfirmRidePanel,
  setVehicleFound,
}) => {
  return (
    <div>
      {/* Close Arrow */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setConfirmRidePanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-4">
        Confirm your Ride
      </h3>

      {/* Vehicle Image */}
      <div className="flex justify-center mb-4">
        <img
          className="h-20"
          src={vehicleImages[vehicleType]}
          alt={vehicleType}
        />
      </div>

      {/* Ride Details */}
      <div className="w-full">
        {/* Pickup */}
        <div className="flex items-center gap-4 p-3 border-b">
          <i className="ri-map-pin-user-fill text-lg"></i>
          <div>
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-4 p-3 border-b">
          <i className="ri-map-pin-2-fill text-lg"></i>
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-4 p-3">
          <i className="ri-currency-line text-lg"></i>
          <div>
            <p className="text-sm text-gray-500">Fare</p>
            <p className="font-semibold text-lg">
              ₹{fare?.[vehicleType]}
            </p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setConfirmRidePanel(false);
          setVehicleFound(true);
          createRide()

        }}
        className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
