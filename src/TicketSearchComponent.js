import React from 'react'
import { createRef } from 'react'
import Pdf from "react-to-pdf";
import { Icon } from '@iconify/react';
export default function TicketSearchComponent({pricePerTicket,dateAndTime, qty,eventId,ticketId,userId,venue,province,ticketLevel,country,title,image}) {
    const ref = createRef()
    const newDate = new Date(dateAndTime)
    const eventDate = newDate?.toLocaleString('en-US', { hour12: true, dateStyle: 'full', timeStyle: "full" })
  return (
      <div>
         
              <div>

                  
               
                      <div className='p-4 w-full md:h-[320px] h-[360px] bg-slate-50 ' ref={ref}>
                          <div className='p-2 border-dotted border-4 border-orange-600 flex'>

                              <div>  <img src={image} alt={title} className='w-[160px] h-[190px] p-2 rounded-2xl' /></div>



                              <div className='p-2 w-full'>
                                  <div className=' bg-gradient-to-r from-amber-500 to-amber-700 w-full'><h1 className='font-bold  text-[20px]] p-2 mb-2'> Ticket for {title}</h1></div>
                                  <h1 className='font-bold text-[10px]'> Event Id: {eventId}</h1>
                                  <h1 className='font-bold text-[10px]'> Ticket Id: {ticketId}</h1>
                                  <h1 className='font-bold text-[10px]'> Ticket for: {qty}</h1>
                                  <h1 className='font-bold text-[10px]'> Buyer: {userId}</h1>
                                  <h1 className='font-bold text-[10px]'> Amount Paid: ${pricePerTicket * qty}</h1>
                                  <h1 className='font-bold text-[10px]'> Venue: {venue}, {province}, {country}</h1>
                          <h1 className='font-bold text-[10px]'> Date: {eventDate}</h1>
                                  <div><h1 className='font-bold text-3xl text-amber-500'>{ticketLevel} </h1></div>



                              </div>

                          </div>
                          <div className='flex items-center justify-center'>
                              <Pdf targetRef={ref} filename={eventId + ticketId}>
                          {({ toPdf }) => <button onClick={toPdf} className='flex justify-center items-center hover:bg-transparent hover:text-amber-400 text-amber-700 bg-transparent mt-2'><Icon icon="fa:download" className='p-2 text-[30px]'/>Download </button>}
                              </Pdf> </div>
                      </div>
                
                  



              </div>
          </div>



  )
}
