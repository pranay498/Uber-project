import React, { useState } from "react";

const VehiclePanel = ({
  fare,
  setVehicleType,
  setVehiclePanel,
  setConfirmRidePanel,
}) => {

  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
    setVehicleType(type);
    setConfirmRidePanel(true);
  };

  return (
    <div>
      {/* Close Arrow */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-4">Choose a Vehicle</h3>

      {/* CAR */}
      <div
        onClick={() => handleSelect("car")}
        className={`flex items-center justify-between p-4 mb-3 border-2 rounded-xl cursor-pointer
        ${selected === "car" ? "border-black bg-gray-50" : "border-gray-200"}`}
      >
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="ml-3 flex-1">
          <h4 className="font-medium">UberGo <i className="ri-user-3-fill ml-1"></i> 4</h4>
          <p className="text-sm text-gray-600">Affordable compact rides</p>
        </div>
        <h2 className="font-semibold text-lg">₹{fare?.car}</h2>
      </div>

      {/* MOTO */}
      <div
        onClick={() => handleSelect("moto")}
        className={`flex items-center justify-between p-4 mb-3 border-2 rounded-xl cursor-pointer
        ${selected === "moto" ? "border-black bg-gray-50" : "border-gray-200"}`}
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_312,w_468/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange.png"
          alt=""
        />
        <div className="ml-3 flex-1">
          <h4 className="font-medium">Moto <i className="ri-user-3-fill ml-1"></i> 1</h4>
          <p className="text-sm text-gray-600">Quick bike rides</p>
        </div>
        <h2 className="font-semibold text-lg">₹{fare?.moto}</h2>
      </div>

      {/* AUTO */}
      <div
        onClick={() => handleSelect("auto")}
        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer
        ${selected === "auto" ? "border-black bg-gray-50" : "border-gray-200"}`}
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_312,w_468/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto.png"
          alt=""
        />
        <div className="ml-3 flex-1">
          <h4 className="font-medium">UberAuto <i className="ri-user-3-fill ml-1"></i> 3</h4>
          <p className="text-sm text-gray-600">Budget auto rides</p>
        </div>
        <h2 className="font-semibold text-lg">₹{fare?.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
