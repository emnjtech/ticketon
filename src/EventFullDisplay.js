/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from 'react'
import { Icon } from '@iconify/react';
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader";
import TicketonContext from './context/ticketon-context';
import { toast, ToastContainer } from 'react-toastify';
import RotateLoader from "react-spinners/RotateLoader";

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
} from "react-share";


export default function EventFullDisplay() {
    const { currUser, signInWithGoogle, } = useContext(TicketonContext)
 const navigate = useNavigate()
    const {eventId} = useParams()
    const [bookBasket, setBookBasket] = useState([])
    const [post, setPost] = useState(null)
    const [wait,setWait] = useState(false)
    let [color, setColor] = useState("purple");
    let [color2, setColor2] = useState("gold");
    let [t1, setT1] = useState(1)
    const [t2, setT2] = useState(1)
    const [t3, setT3] = useState(1)
    const [t4, setT4] = useState(1)
    const [t5, setT5] = useState(1)
    const [loading2, setLoading2] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])
    const [shareDiv, setShareDiv] = useState(false)


    const popShareDiv = () => {
        setShareDiv(!shareDiv)
    }
    console.log(bookBasket)

   

 
    const handleBook = (item) => {
        setBookBasket([...bookBasket, item])
    }

    const removeBook = (ticketId) => {
        setBookBasket(bookBasket.filter(item => item.ticketId !== ticketId))
    }
    const encodedValue = encodeURIComponent(eventId)
    const baseUrl = `http://localhost:3003/allEvents?eventId=${encodedValue}`
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
    
    const handleBooking = () => {
        navigate ("/generateTicket", {state: bookBasket})
    }
  
    
    const handleSaveEvent = () => {
        if (currUser) {
        setLoading2(true)
        bookBasket.map(item => (
        axios
            .post("http://localhost:3003/saveEvents", {
                eventId: item.eventId,
                title:item.title,
                image: item.image,
                ticketId: item.ticketId,
                ticketLevel: item.ticketLevel,
                pricePerTicket:item.pricePerTicket,
                qty: item.qty,
                userId: currUser.email,
                venue: item.venue,
                country: item.country,
                province: item.province,
                dateAndTime: item.dateAndTime,
                           
            }).then(function (response) {
                setLoading2(false)
                setColor2('white')
                //  setUploadSuccess(true)
                console.log(response);

                
                setBookBasket([])
                //   navigate('/eventSummary/:eventId',{state:eventId})
            }).catch(function (errors) {
                setErrorMessage(errors)
                console.log(errorMessage);

            })      
        ))
            toast("Tickets saved successfully")
        }

        else {
            navigate("/signIn")
        }
    }

    const getPost = post?.find((item) => item.eventId === eventId);
    const newDate = new Date(getPost?.dateAndTime)
    const eventDate = newDate?.toLocaleString('en-US', { hour12: true, dateStyle: 'full', timeStyle: "full" })
    
   // const newDate = getPost.dateAndTime
    console.log(newDate.toLocaleString('en-US', { hour12: true, dateStyle: 'full', timeStyle:"full" }))
    return (
       
      <div className='container w-[90%] mx-auto'>
          
            <ToastContainer />


         { getPost && post? 
         <div>
            <div className='md:flex justify-between pt-5' >
              <div className=" md:w-[40%] w-full ">
                
                

                  <div className="relative bg-white border w-full shadow-2xl">
                      <img src={getPost.image}
                          alt={getPost.title} className='w-full h-[500px]' />
                      <div className='p-5'>
                        
                              <div className='flex items-center mb-3'>
                              <div className='w-6'><Icon icon="ic:baseline-event-available" className='text-xl mx-3' /></div>
                              <div className='w-full mx-4'>   <h1 className='text-lg font-bold'>{getPost.title.toUpperCase()}</h1></div>
                              </div>
                              <div className='flex items-center mb-3'>
                              <div className='w-6'><Icon icon="carbon:location-filled" className='text-lg mx-3' /></div>
                              <div className='w-full mx-4'><h1 className='text-[10px]'>{getPost.town}, {getPost.province}, {getPost.country}</h1></div>
                              </div>
                              <div className='flex items-center mb-3'>
                              <div className='w-6'><Icon icon="cil:house" className='text-xl mx-3' /></div>
                                  <div className='w-full mx-4'><h1 className='text-[10px] '>{getPost.venue}</h1></div>
                          </div>
                          
                          <div className='flex justify-between items-center mb-3 w-full'>
                              <div className='w-6'><Icon icon="openmoji:man-singer-light-skin-tone" className='text-xl mx-2' /></div>
                              <div className='w-full mx-4'><h1 className='text-[10px] '>{getPost.Artiste}</h1></div>
                          </div>

                          <div className='flex items-center mb-3'>
                              <div className='w-6'><Icon icon="bx:category" className='text-xl mx-2' /></div>
                              <div className='w-full mx-4'><h1 className='text-[10px] '>{getPost.category}</h1></div>
                          </div>

                          
                              <div className='flex items-center mb-3'>
                              <div className='w-6'><Icon icon="healthicons:i-schedule-school-date-time-outline" className='text-xl mx-2' /></div>
                                        <div className='w-full mx-4'><h1 className='text-[10px] '>{eventDate}</h1></div>
                            </div>
                            
                            <div className='flex items-center mb-3'>
                                <div className='w-6'><h1 className='text-[10px] '>Enquiry:</h1></div>
                                <div className='w-full mx-4'><h1 className='text-[10px] '>{getPost.createdBy}</h1></div>
                            </div>
                                    <div className='flex items-center justify-between'>
                                        <Icon icon="entypo:share" className='text-2xl cursor-pointer' onClick={popShareDiv} />
                                        <div className={!shareDiv ? 'hidden' : 'p-4 w-full rounded-br-full h-[100px] flex justify-center items-center shadow-xl slide-in-blurred-left'}>
                                            <FacebookShareButton
                                                url={`http://localhost:3000/eventSummary/${getPost.eventId}`}
                                                quote={`You are invited to this  ${ getPost.title } Click to your tickets now`}
                                                hashtag="#event">


                                                <FacebookIcon size={35} round={true} logoFillColor="white" className="p-1 hover:text-slate-400" />
                                            </FacebookShareButton>

                                            <TwitterShareButton
                                                url={`http://localhost:3000/eventSummary/${getPost.eventId}`}
                                                quote={"hello"}
                                                hashtag="#programing joke">



                                                <TwitterIcon size={35} round={true} logoFillColor="white" className="p-1" />
                                            </TwitterShareButton>

                                            <WhatsappShareButton
                                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                                quote={"hello"}
                                                hashtag="#programing joke">



                                                <WhatsappIcon size={35} round={true} logoFillColor="white" className="p-1" />
                                            </WhatsappShareButton>

                                            <TelegramShareButton
                                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                                quote={"hello"}
                                                hashtag="#programing joke">



                                                <TelegramIcon size={35} round={true} logoFillColor="white" className="p-1" />
                                            </TelegramShareButton>

                                            <EmailShareButton
                                                url={`http://localhost:3000/eventSummary/${eventId}`}
                                                quote={"hello"}
                                                hashtag="#programing joke">



                                                <EmailIcon size={35} round={true} logoFillColor="white" className="p-1" />
                                            </EmailShareButton>
                                        </div>

                                       
                                    </div>

                      </div>
                      
                     
                      {/*"  <!-- end ribbon container -->"*/}
                  </div>
                    <div className=' overflow-scroll h-[120px] p-4'>
                        <p>
                            {getPost.description}
                        </p>
                        <hr />
                    </div>
                
              </div>

              
                <div className=" md:w-[50%] w-full my-5">
                    <div className='w-full my-4 shadow-2xl'>
                        {!currUser &&
                            <div className='mx-auto w-full h-[200px] my-auto px-10'>
                                <h1 className='text-center p-6'>Please Login to select tickets</h1>
                                <button onClick={signInWithGoogle} className="flex justify-center item-center p-2 w-full my-auto bg-black"  ><Icon icon="flat-color-icons:google" className='text-[40px]' />
                                    <h1 className='p-2 text-lg font-bold'>Sign In With Google</h1></button>
                            </div>}
                    </div>
                    <div className='shadow-2xl grid grid-cols-5'>
                        {bookBasket[0]? <><h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>Ticket type</h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'> Price per Ticket </h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>quantity</h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>Total </h1>
                            <h1 className=' text-[11px] px-4 py-2  text-bold bg-slate-200'>Action</h1></> : 
                            <div className=' col-span-5 p-4'><h1 className='text-center'> NO TICKET SELECTED</h1></div>
                        }             
                    </div>                 
                  {bookBasket?.map((item) =>(
                      <div className=' grid grid-cols-5'>
                      <h1 className='text-[11px] font-bold p-4' key={item.ticketId }>{item.ticketLevel}</h1>
                      <h1 className='text-[11px] font-bold p-4'> ${item.pricePerTicket}</h1>
                      <h1 className='text-[11px] font-bold p-4'>{item.qty}</h1>
                      <h1 className='text-[11px] font-bold p-4'>${item.pricePerTicket !== 0? item.pricePerTicket * item.qty: "0"}</h1>
                      <h1 className=' cursor-pointer text-[11px] p-4 text-blue-500 text-bold' onClick={() => removeBook(item.ticketId)}>Remove ticket</h1>
                      </div>))}
                        
                            {bookBasket[0] && <div className='mx-auto py-5 flex justify-between'>
                                <button className='px-5 py-3 rounded-none bg-transparent text-amber-700 hover:text-slate-400 border-t-2 hover:bg-transparent hover:border-t-amber-600 flex justify-center items-center rounded-b-full'
                                    onClick={handleBooking}><Icon icon="fluent:book-add-20-filled" className='text-[30px] ' />Book Now!</button>
                                 {loading2 && <RotateLoader color={color2} loading={loading2} size={10} className='pt-0' />}
                                
                                <button className='px-5 py-3 rounded-none bg-transparent text-amber-700 hover:text-slate-400 border-t-2 hover:bg-transparent hover:border-t-amber-600 flex justify-center items-center rounded-b-full'
                                    onClick={handleSaveEvent}><Icon icon="fluent:save-20-filled" className='text-[30px]' />Save for later</button>
                               
                            </div>}
                   
                   
                      
                  
                        

                        {getPost.ticketFrom === null &&
                            <div className=' mt-8'>
                                <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                                    <div className='font-bold p-2'>Free event</div>
                                    <div className='font-bold p-2'>${0}</div>
                                    <div className='font-bold p-2 flex items-center'>
                                        <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                            onClick={() => t1 > 1 && setT1(t1 - 1)} /> {t1}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                                onClick={() => setT1(t1 + 1)} /> </div>
                                   {currUser && <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                        ticketLevel: "Free event",
                                        pricePerTicket: 0,
                                        qty: t1,
                                        ticketId: "FREE_EVENT" + Date.now(),
                                        title: getPost.title,
                                        image: getPost.image,
                                        eventId: getPost.eventId,
                                        userId: currUser.email,
                                        venue: getPost.venue,
                                        country: getPost.country,
                                        province:getPost.province,
                                        dateAndTime:getPost.dateAndTime

                                    })} >Add</button>
                                    </div>}
                                    </div></div>}
                        
                            {getPost.ticketLevels.ticket1 && getPost.priceLevels.price1 &&
                                <div >
                                    <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2  mt-8' >
                                        <div className='font-bold p-2'>{getPost.ticketLevels.ticket1}</div>
                                        <div className='font-bold p-2'>${getPost.priceLevels.price1}</div>
                                        <div className='font-bold p-2 flex items-center'>
                                            <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                                onClick={() => t1 > 1 && setT1(t1 - 1)} /> {t1}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                                    onClick={() => setT1(t1 + 1)} /> </div>
                                        {currUser && <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                            ticketLevel: getPost.ticketLevels.ticket1,
                                            pricePerTicket: getPost.priceLevels.price1,
                                            qty: t1,
                                            ticketId: getPost.ticketLevels.ticket1 + Date.now(),
                                            title: getPost.title,
                                            image: getPost.image,
                                            eventId: getPost.eventId,
                                            userId: currUser.email,
                                            venue: getPost.venue,
                                            country: getPost.country,
                                            province: getPost.province,
                                            dateAndTime: getPost.dateAndTime


                                        })} >Add</button>
                                        </div>}
                                    </div></div>}

                            {getPost.ticketLevels.ticket2 && getPost.priceLevels.price2 &&
                                <div >
                                    <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                                        <div className='font-bold p-2'>{getPost.ticketLevels.ticket2}</div>
                                        <div className='font-bold p-2'>${getPost.priceLevels.price2}</div>
                                        <div className='font-bold p-2 flex items-center'>
                                            <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                                onClick={() => t2 > 1 && setT2(t2 - 1)} /> {t2}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                                    onClick={() => setT2(t2 + 1)} /> </div>
                                        <div className='font-bold p-2'>
                                            
                                          {currUser &&  <button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                            ticketLevel: getPost.ticketLevels.ticket2,
                                            pricePerTicket: getPost.priceLevels.price2,
                                            qty: t2,
                                            ticketId: getPost.ticketLevels.ticket2 + Date.now(),
                                            title: getPost.title,
                                            image: getPost.image,
                                            eventId: getPost.eventId,
                                              userId: currUser.email,
                                              venue: getPost.venue,
                                              country: getPost.country,
                                              province: getPost.province,
                                              dateAndTime: getPost.dateAndTime



                                        })} >Add</button>}
                                        
                                        </div>
                                    </div></div>}
                        

                            {getPost.ticketLevels.ticket3 && getPost.priceLevels.price3 &&
                                <div >
                                    <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                                        <div className='font-bold p-2'>{getPost.ticketLevels.ticket3}</div>
                                        <div className='font-bold p-2'>${getPost.priceLevels.price3}</div>
                                        <div className='font-bold p-2 flex items-center'>
                                            <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                                onClick={() => t3 > 1 && setT3(t3 - 1)} /> {t3}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                                    onClick={() => setT3(t3 + 1)} /> </div>
                                        <div className='font-bold p-2'>
                                            
                                          {currUser&&  <button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                            ticketLevel: getPost.ticketLevels.ticket3,
                                            pricePerTicket: getPost.priceLevels.price3,
                                            qty: t3,
                                            ticketId: getPost.ticketLevels.ticket3 + Date.now(),
                                            title: getPost.title,
                                            image: getPost.image,
                                            eventId: getPost.eventId,
                                              userId: currUser.email,
                                              venue: getPost.venue,
                                              country: getPost.country,
                                              province: getPost.province,
                                              dateAndTime: getPost.dateAndTime

                                        })} >Add</button>}
                                        
                                        </div>
                                    </div></div>}
                        

                            {getPost.ticketLevels.ticket1 && getPost.priceLevels.price4 &&
                                <div >
                                    <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                                        <div className='font-bold p-2'>{getPost.ticketLevels.ticket4}</div>
                                        <div className='font-bold p-2'>${getPost.priceLevels.price4}</div>
                                        <div className='font-bold p-2 flex items-center'>
                                            <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                                onClick={() => t4 > 1 && setT4(t4 - 1)} /> {t4}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                                    onClick={() => setT4(t4 + 1)} /> </div>
                                        <div className='font-bold p-2'>
                                            
                                         {currUser&&   <button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                            ticketLevel: getPost.ticketLevels.ticket4,
                                            pricePerTicket: getPost.priceLevels.price4,
                                            qty: t4,
                                            ticketId: getPost.ticketLevels.ticket4 + Date.now(),
                                            title: getPost.title,
                                            image: getPost.image,
                                             eventId: getPost.eventId,
                                             venue: getPost.venue,
                                             country: getPost.country,
                                             province: getPost.province,
                                             dateAndTime: getPost.dateAndTime,
                                             


                                        })} >Add</button>}
                                        
                                        </div>
                                    </div></div>}

                            {getPost.ticketLevels.ticket4 && getPost.priceLevels.price4 &&
                                <div >
                                    <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2'  >
                                        <div className='font-bold p-2'>{getPost.ticketLevels.ticket5}</div>
                                        <div className='font-bold p-2'>${getPost.priceLevels.price5}</div>
                                        <div className='font-bold p-2 flex items-center'>
                                            <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                                onClick={() => t5 > 1 && setT5(t5 - 1)} /> {t5}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                                    onClick={() => setT5(t5 + 1)} /> </div>
                                        <div className='font-bold p-2'>
                                           {currUser && <button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                            ticketLevel: getPost.ticketLevels.ticket5,
                                            pricePerTicket: getPost.priceLevels.price5,
                                            qty: t5,
                                            ticketId: getPost.ticketLevels.ticket5 + Date.now(),
                                            title: getPost.title,
                                            image: getPost.image,
                                            eventId: getPost.eventId,
                                               userId: currUser.email,
                                               venue: getPost.venue,
                                               country: getPost.country,
                                               province: getPost.province,
                                               dateAndTime: getPost.dateAndTime
                                            })} >Add</button>}
                                        
                                        </div>
                                    </div></div>}
                        
                        
                    <h1 className='text-center text-[12px]'>Note: This is only a demo. No payment gateway is connected to it yet. So feel free to click on the "Book" button if you want to. It won't bite your money, again, it's only a demo</h1>
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        </div>
            </div>


          
                <hr />
              
           






        </div>
         
         : <div className='flex justify-center items-center h-[400px]'>
    <ScaleLoader color={color} loading={wait} size={150} className='pt-0"' />

</div>}
           
</div >

          
           
  )
}
 