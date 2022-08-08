import React,{useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    EmailIcon,
} from 'react-share';

export default function EventComponent({ title, eventId, image, artiste, dateAndTime, town, province, country, ticketFrom, venue }) {
    const [shareDiv, setShareDiv] = useState(false)
    const [HideComponent,setHideComponent] = useState(false)

    useEffect(() => {
        var g1 = new Date(dateAndTime);
        var g2 = new Date();

        if (g1?.getTime() === g2.getTime())
           
            {
            setHideComponent(!HideComponent)
      
    }
        else
        {
            console.log("Not equal");
        }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
   

    const popShareDiv = () => {
        setShareDiv(!shareDiv)
    }

    const newDate = new Date(dateAndTime)
    const eventDate = newDate?.toLocaleString('en-US', { hour12: true, dateStyle: 'full', timeStyle: "full" })


    return (
    <div>
       {!HideComponent && <div className=" bg-white  ">
            {/*"   <!-- div with ribbon -->"*/}

            <div className="relative border w-[90%] mx-auto  overflow-hidden shadow-2xl rounded-2xl transition ease-in-out delay-300 hover:-translate-y-3 hover:scale-x-95 duration-300  ">
               <Link to={`/eventSummary/${eventId}`}> <img src={image}
                    alt="event " className='w-full h-[350px]' /></Link>
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
                        <div className='w-full mx-4'><h1 className='text-[10px] '>{eventDate}</h1></div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <Icon icon="entypo:share" className='text-2xl cursor-pointer' onClick={popShareDiv}/>
                        <div className={!shareDiv ? 'hidden' : 'p-4 w-[50%] rounded-br-full h-[100px] grid grid-cols-3 shadow-xl roll-in-blurred-left'}>
                            <FacebookShareButton
                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                quote={"You are invited to this" + {title} + "Click to your tickets now"}
                                hashtag="#event">
                               

                                <FacebookIcon size={30} round={true} logoFillColor="white" className="p-1 hover:text-slate-400" />
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                quote={"hello"}
                                hashtag="#programing joke">
                               


                                <TwitterIcon size={30} round={true} logoFillColor="white" className="p-1" />
                            </TwitterShareButton>

                            <WhatsappShareButton
                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                quote={"hello"}
                                hashtag="#programing joke">



                                <WhatsappIcon size={30} round={true} logoFillColor="white" className="p-1" />
                            </WhatsappShareButton>

                            <TelegramShareButton
                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                quote={"hello"}
                                hashtag="#programing joke">



                                <TelegramIcon size={30} round={true} logoFillColor="white" className="p-1" />
                            </TelegramShareButton>

                            <EmailShareButton
                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                quote={"hello"}
                                hashtag="#programing joke">



                                <EmailIcon size={30} round={true} logoFillColor="white" className="p-1" />
                            </EmailShareButton>
                        </div>

                       <Link to={`/eventSummary/${eventId}`}> <button className='flex items-center justify-between px-4 py-2 rounded-full bg-[#C25DC4]'><Icon icon="material-symbols:event-available-rounded" className='text-2xl p-1 ' />
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
}
        </div>
    )
}
