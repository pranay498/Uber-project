import { getAddressCoordinate ,getDistanceTime ,getAutoCompleteSuggestions } from "../services/maps.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCoordinatesController = asyncHandler(async (req, res) => {
  const { address } = req.query;

  if (!address) {
    const error = new Error("Address is required");
    error.statusCode = 400;
    throw error;
  }

  const coordinates = await getAddressCoordinate(address);

  res.status(200).json({
    success: true,
    data: coordinates,
  });
});

export const getDistanceTimeController = asyncHandler(async (req, res) => {
  const { origin, destination } = req.query;

  const data = await getDistanceTime(origin, destination);

  res.status(200).json({
    success: true,
    data,
  });
});

export const getAutoCompleteSuggestionsController = asyncHandler(
  async (req, res) => {
    const { input } = req.query;

    if (!input || input.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Input must be at least 2 characters",
      });
    }

    const suggestions = await getAutoCompleteSuggestions(input);

    res.status(200).json({
      success: true,
      data: suggestions,
    });
  }
);


