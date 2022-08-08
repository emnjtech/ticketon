import React, { useState, useEffect,useContext } from 'react'
import axios from 'axios'
import MoonLoader from "react-spinners/MoonLoader";
import TicketonContext from './context/ticketon-context.js';
import ProtectedRoute from './ProtectedRoute'
import TicketSearchComponent from './TicketSearchComponent.js';
import { Icon } from '@iconify/react';

export default function ReprintTicket() {
  


    const [post, setPost] = useState(null)
    const [wait, setWait] = useState(false)
    let [color, setColor] = useState("#C25DC4");
    const { currUser, signInWithGoogle, } = useContext(TicketonContext)



    const baseUrl = "http://localhost:3003/tickets"

    useEffect(() => {
        const getPost = async () => {
            setWait(true)
            await axios.get(baseUrl).then((response) => {
                setPost(response.data);

                setWait(false)
                setColor('green')
            })
        }
        getPost()
    }, []);
    console.log(post)

    const ticketsFilter =post?.filter((item) => item.userId === currUser.email.toLowerCase())
    console.log (ticketsFilter)



   

    return (
            <div className='container mx-auto'>
                
                <div className=" md:w-[50%] w-full my-5">
                    <div className='w-full my-4 shadow-2xl'>
                        {!currUser &&
                            <div className='mx-auto w-full h-[200px] my-auto px-10'>
                                <h1 className='text-center p-6'>Please Login to select tickets</h1>
                                <button onClick={signInWithGoogle} className="flex justify-center item-center p-2 w-full my-auto bg-black"  ><Icon icon="flat-color-icons:google" className='text-[40px]' />
                                    <h1 className='p-2 text-lg font-bold'>Sign In With Google</h1></button>
                            </div>}
                    </div></div>
                

                <div className='flex justify-center align-center'>
                    <div className='p-5'> <MoonLoader loading={wait} color={color} width={100} /></div> 
            </div>

            <div>
                {!wait && <h1 className='text-xl text-center p-4 font-bold'>{ticketsFilter?.length !==0? "YOUR PREVIOUS TICKETS" : "YOU HAVE NO TICKETS" }</h1>}
                <div className='grid md:grid-cols-2 gap-4 w-[90%] mx-auto p-5'>

                        {ticketsFilter && ticketsFilter.map((item => (
                            <div>
                                <TicketSearchComponent
                                    key={item.eventId}
                                    eventId={item.eventId}
                                    image={item.image}
                                    title={item.title}
                                    dateAndTime={item.dateAndTime}
                                    pricePerTicket={item.pricePerTicket}
                                    qty={item.qty}
                                    alt={item.title}
                                    venue={item.venue}
                                    country={item.country}
                                    province={item.province}
                                    date={item.dateAndTime}
                                    userId={item.userId}
                                    ticketId={item.ticketId}
                                    ticketLevel = {item.ticketLevel}
                                    
                                
                                />

                            </div>

                        )))}

                </div>

            </div>


        </div>
    )
}
 //: <div className='flex justify-center items-center h-[300px]'> <ClockLoader color={color} loading={wait} size={80} className='pt-0"' /></div>