import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MoonLoader from "react-spinners/MoonLoader";
import TicketonContext from './context/ticketon-context.js';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function MyBookings() {

    const { currUser, signInWithGoogle, } = useContext(TicketonContext)
    const [bookBasket, setBookBasket] = useState([])
    const [post, setPost] = useState(null)
    const [wait, setWait] = useState(false)
    let [color, setColor] = useState("#C25DC4");


    const removeBook = (ticketId) => {
        axios.delete(`http://localhost:3003/deleteSavedTicket/${ticketId}`)
            .then((response) => {
            console.log(response.data)
        })
        setBookBasket(bookBasket.filter(item => item.ticketId !== ticketId))
    }

const navigate = useNavigate()

 

    const baseUrl = "http://localhost:3003/savedEvents"

    useEffect(() => {
        const getPost = async () => {
            setWait(true)
            await axios.get(baseUrl).then((response) => {
                setBookBasket(response.data);

                setWait(false)
                setColor('green')
            })
        }
        getPost()
    }, []);
    console.log(bookBasket)

    const ticketsFilter = post?.filter((item) => item.userId === currUser.email.toLowerCase())
    console.log(ticketsFilter)


    const handleBooking = () => {
        navigate("/generateTicket", { state: bookBasket })
    }



    return (
        
            <div className='container mx-auto'>

            <div className=" md:w-[70%] w-full my-5 mx-auto">
                <h1 className='text-center'> Welcome! { currUser.displayName}</h1>

                {wait && <div className='md:flex justify-center align-center'>
                    <div className='p-5'> <MoonLoader loading={wait} color={color} width={100} /> Please wait</div>
                </div>}
                <div className='w-full my-4 shadow-2xl'>
               
                </div>
                <div className='shadow-2xl grid grid-cols-5'>
                    {bookBasket[0] ? <><h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>Ticket type</h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'> Price per Ticket </h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>quantity</h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>Total </h1>
                        <h1 className=' text-[11px] px-4 py-2  text-bold bg-slate-200'>Action</h1></> :
                        <div className=' col-span-5 p-4'><h1 className='text-center'> YOU HAVE NO SAVED BOOKING </h1></div>
                    }
                </div>
                {bookBasket?.map((item) => (
                    <div className=' grid grid-cols-5'>
                        <h1 className=' col-span-5 text-center p-4 bg-slate-100  text-amber-500'>{item.title}</h1>
                        <h1 className='text-[11px] font-bold p-4' key={item.ticketId}>{item.ticketLevel}</h1>
                        <h1 className='text-[11px] font-bold p-4'> ${item.pricePerTicket}</h1>
                        <h1 className='text-[11px] font-bold p-4'>{item.qty}</h1>
                        <h1 className='text-[11px] font-bold p-4'>${item.pricePerTicket !== 0 ? item.pricePerTicket * item.qty : "0"}</h1>
                        <div className='flex justify-center items-center cursor-pointer'  onClick={() => removeBook(item.ticketId)}><Icon icon="carbon:row-delete" className='text-[20px] text-red-500' /><h1 className=' text-[11px] py-4 px-1 text-red-500 text-bold' >Delete ticket</h1></div>
                    </div>))}

                {bookBasket[0] && <div className='mx-auto py-5 flex justify-between'>
                    <button className='px-5 py-3 rounded-none bg-transparent text-amber-700 hover:text-slate-400 border-t-2 hover:bg-transparent hover:border-t-amber-600 flex justify-center items-center rounded-b-full' onClick={handleBooking}><Icon icon="fluent:book-add-20-filled" className='text-[30px] '/>Book Now!</button>
                    
                </div>}

</div>

                </div>


          
       
    )
}
 //: <div className='flex justify-center items-center h-[300px]'> <ClockLoader color={color} loading={wait} size={80} className='pt-0"' /></div>