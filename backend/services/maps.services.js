import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import Captain from "../models/captain.model.js";


export const getAddressCoordinate = async (address) => {
  if (!address) {
    const error = new Error("Address is required");
    error.statusCode = 400;
    throw error;
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "uber-clone-backend",
    },
  });

  if (!response.data.length) {
    const error = new Error("Unable to fetch coordinates");
    error.statusCode = 400;
    throw error;
  }

  const location = response.data[0];

  return {
    ltd: Number(location.lat),
    lng: Number(location.lon),
  };
};


export const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    const error = new Error("Origin and destination are required");
    error.statusCode = 400;
    throw error;
  }

  const from = await getAddressCoordinate(origin);
  const to = await getAddressCoordinate(destination);

  const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.ltd};${to.lng},${to.ltd}?overview=false`;

  const response = await axios.get(url);

  if (!response.data.routes?.length) {
    const error = new Error("No route found between locations");
    error.statusCode = 404;
    throw error;
  }

  const route = response.data.routes[0];

  return {
    distance: `${(route.distance / 1000).toFixed(2)} km`,
    duration: `${Math.round(route.duration / 60)} mins`,
    distanceValue: route.distance, // meters
    durationValue: route.duration, // seconds
  };
};


export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    const error = new Error("Input query is required");
    error.statusCode = 400;
    throw error;
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=json&limit=5`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "uber-clone-backend",
    },
  });

  return response.data
    .map((item) => item.display_name)
    .filter(Boolean);
};

export const getCaptainsInTheRadius = asyncHandler(
  async (ltd, lng, radius) => {
    // ⚠️ MongoDB expects [lng, lat]
    const captains = await Captain.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, ltd], radius / 6371], // radius in KM
        },
      },
    });

    return captains;
  }
);