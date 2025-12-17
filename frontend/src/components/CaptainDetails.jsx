import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext.jsx'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="captain"
          />
          <div>
            <h4 className='text-lg font-medium capitalize'>
              {captain?.fullname?.firstname} {captain?.fullname?.lastname}
            </h4>
            <p className='text-sm text-gray-500'>
              {captain?.vehicle?.vehicleType?.toUpperCase()} Driver
            </p>
          </div>
        </div>

        {/* Earnings */}
        <div className='text-right'>
          <h4 className='text-xl font-semibold'>₹295.20</h4>
          <p className='text-sm text-gray-600'>Total Earnings</p>
        </div>
      </div>

      {/* Stats */}
      <div className='flex p-4 mt-8 bg-gray-100 rounded-xl justify-between'>
        <div className='text-center flex-1'>
          <i className="text-3xl ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>

        <div className='text-center flex-1'>
          <i className="text-3xl ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>32 km</h5>
          <p className='text-sm text-gray-600'>Distance</p>
        </div>

        <div className='text-center flex-1'>
          <i className="text-3xl ri-booklet-line"></i>
          <h5 className='text-lg font-medium'>14</h5>
          <p className='text-sm text-gray-600'>Trips</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
