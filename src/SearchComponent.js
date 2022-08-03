 import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function SearchComponent({ title, eventId, image, artiste, dateAndTime, town, province, country, ticketFrom, venue }) {
   return (
       <div>
           
           <div className=" bg-white  ">
               {/*"   <!-- div with ribbon -->"*/}

               <div className="relative border w-[90%] mx-auto  overflow-hidden shadow-2xl rounded-2xl transition ease-in-out delay-300 hover:-translate-y-3 hover:scale-x-95 duration-300  ">
                   <Link to={`/eventSummary/${eventId}`}> <img src={image}
                       alt="event " className='w-full h-[200px]' /></Link>
                   <div className='p-5'>
                       <div className='flex  justify-between items-center mb-3 w-full'>
                           <div className='w-6'><Icon icon="ic:baseline-event-available" className='text-xl mx-3' /></div>
                           <div className='w-full mx-4'> <h1 className='text-sm font-bold'>{title}</h1></div>
                       </div>

                       <div className='flex  justify-between items-center mb-3 w-full'>
                           <div className='w-6'><Icon icon="carbon:location-filled" className='text-lg mx-3' /></div>
                           <div className='w-full mx-4'><h1 className='text-[10px]'>{town}, {province}, {country}</h1></div>
                       </div>
                       <div className='flex  justify-between items-center mb-3 w-full'>
                           <div className='w-6'><Icon icon="cil:house" className='text-lg mx-3' /></div>
                           <div className='w-full mx-4'><h1 className='text-[10px] '>{venue}</h1></div>
                       </div>

                       <div className='flex justify-between items-center mb-3 w-full'>
                           <div className='w-6'><Icon icon="openmoji:man-singer-light-skin-tone" className='text-xl mx-2' /></div>
                           <div className='w-full mx-4'><h1 className='text-[10px] '>{artiste}</h1></div>
                       </div>





                       <div className='flex  justify-between items-center mb-3 w-full'>
                           <div className='w-6'><Icon icon="healthicons:i-schedule-school-date-time-outline" className='text-lg mx-3' /></div>
                           <div className='w-full mx-4'><h1 className='text-[10px] '>{dateAndTime}</h1></div>
                       </div>

                       <div className='flex items-center justify-between'>
                           <Icon icon="fa:share-square-o" className='text-2xl' />
                           <Link to="eventSummary"> <button className='flex items-center justify-between px-4 py-2 rounded-full bg-[#C25DC4]'><Icon icon="material-symbols:event-available-rounded" className='text-2xl p-1 ' />
                               <h1 className='text-[12px]'>Get Info</h1></button></Link>

                       </div>

                   </div>

                   <div className="absolute left-0 top-0 h-16 w-16">
                       {/*"<!-- ribbon -->"*/}

                       {ticketFrom ? <div className="absolute left-[-34px] top-[32px] w-[165px] transform 
                    -rotate-45 bg-pink-500 text-center text-white font-semibold py-1">From ${ticketFrom} </div> :
                           <div className="absolute left-[-34px] top-[32px] w-[165px] transform 
                    -rotate-45 bg-green-500 text-center text-white font-semibold py-1">Free</div>

                       }

                       { /*"<!-- end ribbon -->"*/}
                   </div>

                   {/*"  <!-- end ribbon container -->"*/}
               </div>

               {/*" <!-- end div with ribbon -->"*/}
           </div>


           


     </div>
   )
 }
 