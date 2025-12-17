import { getDistanceTime } from "./maps.services.js";

export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  return {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distanceValue / 1000) * perKmRate.auto +
        (distanceTime.durationValue / 60) * perMinuteRate.auto
    ),

    car: Math.round(
      baseFare.car +
        (distanceTime.distanceValue / 1000) * perKmRate.car +
        (distanceTime.durationValue / 60) * perMinuteRate.car
    ),

    moto: Math.round(
      baseFare.moto +
        (distanceTime.distanceValue / 1000) * perKmRate.moto +
        (distanceTime.durationValue / 60) * perMinuteRate.moto
    ),
  };
};

