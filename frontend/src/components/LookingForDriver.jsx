import React from "react";

const vehicleImages = {
  car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
  moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_312,w_468/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange.png",
  auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_312,w_468/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto.png",
};

const LookingForDriver = ({
  pickup,
  destination,
  fare,
  vehicleType,
  setVehicleFound,
}) => {
  return (
    <div>
      {/* Close Arrow */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setVehicleFound(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Heading */}
      <h3 className="text-2xl font-semibold text-center mb-2">
        Looking for a Driver
      </h3>
      <p className="text-center text-sm text-gray-500 mb-4">
        Hang tight, we are finding the best driver for you 🚗
      </p>

      {/* Vehicle Image */}
      <div className="flex justify-center mb-4">
        <img
          className="h-20"
          src={vehicleImages[vehicleType]}
          alt={vehicleType}
        />
      </div>

      {/* Ride Details Card */}
      <div className="bg-gray-100 rounded-xl p-4">
        {/* Pickup */}
        <div className="flex items-start gap-4 pb-3 border-b">
          <i className="ri-map-pin-user-fill text-lg text-black"></i>
          <div>
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="font-medium text-sm">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 py-3 border-b">
          <i className="ri-map-pin-2-fill text-lg text-black"></i>
          <div>
            <p className="text-xs text-gray-500">Destination</p>
            <p className="font-medium text-sm">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4 pt-3">
          <i className="ri-currency-line text-lg text-black"></i>
          <div>
            <p className="text-xs text-gray-500">Estimated Fare</p>
            <p className="font-semibold text-base">
              ₹{fare?.[vehicleType]}
            </p>
          </div>
        </div>
      </div>

      {/* Loader */}
      <div className="flex justify-center mt-5">
        <div className="h-6 w-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-3">
        Searching nearby drivers...
      </p>
    </div>
  );
};

export default LookingForDriver;
