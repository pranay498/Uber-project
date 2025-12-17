const LocationPanel = ({
  pickupSuggestions,
  destinationSuggestions,
  activeField,
  setPickup,
  setDestination,
  setPanelOpen,
}) => {
  return (
    <div className="p-4">

      {activeField === "pickup" &&
        pickupSuggestions.map((item, index) => (
          <div
            key={index}
            className="p-3 border-b cursor-pointer"
            onClick={() => {
              setPickup(item);
                   // 👈 select ke baad band
            }}
          >
            {item}
          </div>
        ))}

      {activeField === "destination" &&
        destinationSuggestions.map((item, index) => (
          <div
            key={index}
            className="p-3 border-b cursor-pointer"
            onClick={() => {
              setDestination(item);  // 👈 select ke baad band
            }}
          >
            {item}
          </div>
        ))}

    </div>
  );
};

export default LocationPanel;
