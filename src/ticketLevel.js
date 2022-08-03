import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function TicketLevel({ eventId, ticketLevel, price, qty,title,addBtn,subBtn }) {
   const navigate = useNavigate()
    const [bookBasket, setBookBasket] = useState([])
    const newItem = {
        eventId,
        title,
        ticketLevel,
        price,
        qty
    }


    const handleBook = (item) => {
        const itemExist = bookBasket.find((event) => event.ticketLevel = item.ticketLevel)

        let newItem
        if (!itemExist) {
           newItem =  [...bookBasket, item]
        }
        else {
            newItem = bookBasket.map(event => event.ticketLevel === item.ticketLevel ? { ...event, qty: event.qty + 1 } : { ...event })

        }
        return setBookBasket(newItem)

    }
console.log(bookBasket)
  return (
      <div > 
          <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
          {ticketLevel && <div className='font-bold p-2'>{ticketLevel}</div>}
          {price && <div className='font-bold p-2'>${price}</div>}
          {price && <div className='font-bold p-2 flex items-center'><Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500' onClick={ subBtn} /> {qty}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill" onClick={addBtn} /> </div>}
              {price && <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook(newItem)} >Add</button></div>}
</div>
      </div>
  )
}
