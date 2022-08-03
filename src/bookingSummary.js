import React from 'react'


export default function BookingSummary({price,ticketLevel,remove}) {
 
    

  return (
      <div className='w-full p-4'>
        {  <div>

        <div className='grid grid-cols-3 items-center'>
          <h1 className='text-sm'>{ticketLevel}</h1>
          <h1 className='text-sm'>{price}</h1>
          <button className='text-sm' onClick={remove}>Remove ticket</button>


        </div>

          </div>
      }
      
      </div>
  )
}
