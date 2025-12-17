import React from 'react'


const LocationPanel = (props) => {

    const suggestions = ["hello ", "hi name "]

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div
                        onClick={() => {
                            props.setVehiclePanel(true);
                            props.setPanelOpen(false);
                        }}
                        key={idx} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}
 
export default LocationPanel
