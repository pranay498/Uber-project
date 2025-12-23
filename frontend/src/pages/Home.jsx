import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

import LocationPanel from "../components/LocationPanel.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import { SocketContext } from "../context/SocketContext.jsx";
import { UserDataContext } from "../context/UseContext.jsx";


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState("")


  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(true);
  const [activeField, setActiveField] = useState(null);
  const [confirmedRide, setConfirmedRide] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);




  const { sendMessage, receiveMessage } = useContext(SocketContext)
  const { user, setUser } = useContext(UserDataContext);

  const panelref = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext)

  /* -------------------- FETCH SUGGESTIONS -------------------- */
  const fetchSuggestions = async (value, setSuggestions) => {
    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value.trim() },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );

      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error("fetchSuggestions error:", error.response?.data || error.message);
      setSuggestions([]);
    }
  };

  const createRide = async () => {
    if (!pickup || !destination || !vehicleType) {
      alert("Pickup, Destination and Vehicle are required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );

      console.log("Ride created:", response.data.data);

      // UI flow
      setConfirmRidePanel(false);
      setVehicleFound(true);
    } catch (error) {
      console.error("Create ride error:", error.response?.data || error.message);
      alert("Failed to create ride");
    }
  };
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    fetchSuggestions(value, setPickupSuggestions);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchSuggestions(value, setDestinationSuggestions);
  };
  const handleFindTrip = async () => {
    if (!pickup || !destination) {
      alert("Please fill pickup and destination");
      return;
    }

    try {
      await fetchFare();
      setPanelOpen(false);
      setVehiclePanel(true);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchFare = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      console.log(response.data.data)
      setFare(response.data.data); // { auto, car, moto }
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  /* -------------------- GSAP ANIMATIONS -------------------- */
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelref.current, { height: "70%", duration: 0.4 });
      gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.2 });
    } else {
      gsap.to(panelref.current, { height: 0, duration: 0.4 });
      gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      y: vehicleFound ? "0%" : "100%",
      duration: 0.3,
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriver ? "0%" : "100%",
      duration: 0.3,
    });
  }, [waitingForDriver]);



  /* -------------------- UseEffect ANIMATIONS -------------------- */
  useEffect(() => {
    if (!user || !(user.id || user._id)) return;

    const userId = user.id || user._id;

    socket.emit("join", {
      userId,
      userType: "user",
    });

    console.log("✅ join sent (user)", userId);
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handler = (ride) => {
      console.log("🚗 Ride confirmed:", ride);

      setConfirmedRide(ride);     // full ride + captain
      setRideConfirmed(true);

      setVehicleFound(false);     // close looking panel
      setWaitingForDriver(true);  // open waiting panel
    };

    socket.on("ride-confirmed", handler);

    return () => socket.off("ride-confirmed", handler);
  }, [socket]);


  /* -------------------- Console.log ANIMATIONS -------------------- */
  useEffect(() => {
    console.log("vehicleFound:", vehicleFound);
  }, [vehicleFound]);

  useEffect(() => {
    console.log("waitingForDriver:", waitingForDriver);
  }, [waitingForDriver]);

  useEffect(() => {
    console.log({ vehicleFound, waitingForDriver, rideConfirmed });
  }, [vehicleFound, waitingForDriver, rideConfirmed]);

  useEffect(() => {
    setTimeout(() => {
      setConfirmedRide({ fake: true });
      setWaitingForDriver(true);
      setVehicleFound(false);
    }, 3000);
  }, []);




  /* -------------------- JSX -------------------- */
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/1*8JrK5Z6z9wqK0K3U7xQzKg.png"
          alt=""
        />
      </div>
      {/* yeh panel humko destination and pickup maine maadad karenga */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          {/* har h5 tag panel ko down karne le liye istmaal hota hai  */}
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={submitHandler}>
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setActiveField("pickup");
                setPanelOpen(true);
              }}

            />

            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
            />
          </form>
          <button
            onClick={handleFindTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
            Find Trip
          </button>
        </div>
        <div ref={panelref} className="bg-white h-0">
          <LocationPanel
            activeField={activeField}
            pickupSuggestions={pickupSuggestions}
            destinationSuggestions={destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          fare={fare}
          setVehicleType={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-20 bottom-0 bg-white px-3 py-6 pt-12">
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-30 bottom-0 bg-white px-3 py-6 pt-12" >
        <WaitingForDriver
          ride={confirmedRide}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
