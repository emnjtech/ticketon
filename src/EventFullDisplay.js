/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from 'react'
import { Icon } from '@iconify/react';
import { useParams, } from 'react-router-dom'
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader";
import { updateCurrentUser } from 'firebase/auth';
import TicketonContext from './context/ticketon-context';




export default function EventFullDisplay() {
   const {currUser} = useContext(TicketonContext)
 
    const {eventId} = useParams()
    const [bookBasket, setBookBasket] = useState([])
    const [post, setPost] = useState(null)
    const [wait,setWait] = useState(false)
    let [color, setColor] = useState("purple");
    let [t1, setT1] = useState(1)
    const [t2, setT2] = useState(1)
    const [t3, setT3] = useState(1)
    const [t4, setT4] = useState(1)
    const [t5, setT5] = useState(1)
    const [remTicket,setRemTicket] = useState(0)

    console.log(bookBasket)

    const encodedValue = encodeURIComponent(eventId)
    const baseUrl = `http://localhost:3003/allEvents?eventId=${encodedValue}`

    /* const getPost = async () => {
        try {
            await axios.get(baseUrl)
                .then((response) => {
                    setPost(response.data);
                    console.log(post)
                });
        }
        catch (error) {
            console.log(error)

        }
       
        
    };*/
    const handleBook = (item) => {
      /*  const itemExist = bookBasket.find((event) => event.ticketLevel = item.ticketLevel)
        let newItem
        if (!itemExist) {
            newItem = [...bookBasket, item]
        }
        else {
            newItem =bookBasket.map(event => event.ticketLevel === item.ticketLevel ? { ...event, qty: event.qty + value} : { ...event })
        } */
        setBookBasket([...bookBasket, item])
    }

    const removeBook = (ticketId) => {
    

       // const obj = bookBasket.filter(item => item.ticketLevel === ticket)
        setBookBasket(bookBasket.filter(item => item.id !== ticketId))
       /* const index = bookBasket.findIndex(
            (item) => item.ticketLevel === ticket
        );

        let newBook = [...bookBasket];

        if (index >= 0) {
           setBookBasket(newBook.splice(index, 1));
        } else {
            console.warn(
                `Can't remove product(id: ${bookBasket}) as its not in the basket!`
            )
        }*/
    }
  
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
    


    const getPost = post?.find((item) => item.eventId === eventId);
    return (
       
      <div className='container w-[90%] mx-auto'>
          
          


         { post? <div><div className='md:flex justify-between pt-5' >
              <div className=" md:w-[40%] w-full ">
                
                  {/*"   <!-- div with ribbon -->"*/}

                  <div className="relative bg-white border w-full shadow-2xl">
                      <img src={getPost.image}
                          alt={getPost.title} className='w-full h-[500px]' />
                      <div className='p-5'>
                        
                              <div className='flex items-center mb-3'>
                              <div className='w-6'><Icon icon="ic:baseline-event-available" className='text-xl mx-3' /></div>
                              <div className='w-full mx-4'>   <h1 className='text-lg font-bold'>{getPost.title}</h1></div>
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
                              <div className='w-full mx-4'><h1 className='text-[10px] '>{getPost.dateAndTime.toString()}</h1></div>
                            </div>
                            
                            <div className='flex items-center mb-3'>
                                <div className='w-6'><h1 className='text-[10px] '>Enquiry:</h1></div>
                                <div className='w-full mx-4'><h1 className='text-[10px] '>{getPost.createdBy}</h1></div>
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
                  {/*" <!-- end div with ribbon -->"*/}
              </div>

              
               <div className=" md:w-[50%] w-full my-5">
                    <div className='shadow-2xl grid grid-cols-5'>
                        {bookBasket[0]? <><h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>Ticket type</h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'> Price per Ticket </h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>quantity</h1>
                        <h1 className='text-[11px] font-bold px-4 py-2 bg-slate-200'>Total </h1>
                            <h1 className=' text-[11px] px-4 py-2  text-bold bg-slate-200'>Action</h1></> : 
                            <div className=' col-span-5 p-4'><h1 className='text-center'> NO TICKET SELECTED</h1></div>
                            }
                  {bookBasket?.map((item) =>(<>
                      <h1 className='text-[11px] font-bold p-4'>{item.ticketLevel}</h1>
                      <h1 className='text-[11px] font-bold p-4'> ${item.price}</h1>
                      <h1 className='text-[11px] font-bold p-4'>{item.qty}</h1>
                      <h1 className='text-[11px] font-bold p-4'>${item.price === 0? item.price * item.qty: "0"}</h1>
                      <h1 className=' cursor-pointer text-[11px] p-4 text-blue-500 text-bold' onClick={() => removeBook(item.id)}>Remove ticket</h1>
                  </>))}
                        
                    </div>
                    {bookBasket[0] && <div className='mx-auto py-5 flex justify-between'>
                        <button className='px-5 py-3 rounded-none bg-slate-400'>Book Now!</button>
                        <button className='px-5 py-3 rounded-none bg-slate-400'>Save for later</button>
                    </div>}
            </div>


          </div>
          <hr />
                {getPost.ticketFrom ===null && 
                    <div >
                        <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                            <div className='font-bold p-2'>Free event</div>
                            <div className='font-bold p-2'>${0}</div>
                            <div className='font-bold p-2 flex items-center'>
                                <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                    onClick={() => t1 > 1 && setT1(t1 - 1)} /> {t1}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                        onClick={() => setT1(t1 + 1)} /> </div>
                            <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                ticketLevel: "Free event",
                                price: 0,
                                qty: t1,
                                id: "FREE_EVENT" + Date.now()

                            })} >Add</button></div>
                        </div></div>}
              {getPost.ticketLevels.ticket1 && getPost.priceLevels.price1 &&
              <div >
                  <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                          <div className='font-bold p-2'>{getPost.ticketLevels.ticket1}</div>
                          <div className='font-bold p-2'>${getPost.priceLevels.price1}</div>
                          <div className='font-bold p-2 flex items-center'>
                              <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                  onClick={() =>t1 >1 && setT1(t1 - 1)} /> {t1}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                  onClick={() => setT1(t1 + 1)} /> </div>
                          <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                              ticketLevel: getPost.ticketLevels.ticket1,
                              price: getPost.priceLevels.price1,
                              qty: t1,
                              id:getPost.ticketLevels.ticket1 + Date.now()
                          
                      }) } >Add</button></div>
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
                          <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                              ticketLevel: getPost.ticketLevels.ticket2,
                              price: getPost.priceLevels.price2,
                              qty: t2,
                              id: getPost.ticketLevels.ticket2 + Date.now()

                          })} >Add</button></div>
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
                            <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                ticketLevel: getPost.ticketLevels.ticket3,
                                price: getPost.priceLevels.price3,
                                qty: t3,
                                id: getPost.ticketLevels.ticket3 + Date.now()

                            })} >Add</button></div>
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
                            <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                ticketLevel: getPost.ticketLevels.ticket4,
                                price: getPost.priceLevels.price4,
                                qty: t4,
                                id: getPost.ticketLevels.ticket4 + Date.now()

                            })} >Add</button></div>
                        </div></div>}


                {getPost.ticketLevels.ticket4 && getPost.priceLevels.price4 &&
                    <div >
                        <div className='w-full grid grid-cols-4 items-center bg-slate-100 mb-2' >
                            <div className='font-bold p-2'>{getPost.ticketLevels.ticket5}</div>
                            <div className='font-bold p-2'>${getPost.priceLevels.price5}</div>
                            <div className='font-bold p-2 flex items-center'>
                                <Icon icon="bi:arrow-down-circle-fill" className='text-3xl p-1 text-[#C25DC4]   cursor-pointer hover:text-gray-500'
                                    onClick={() => t5 > 1 && setT5(t5 - 1)} /> {t5}<Icon className='text-3xl p-1 text-[#C25DC4] cursor-pointer hover:text-gray-500' icon="bi:arrow-up-circle-fill"
                                        onClick={() => setT5(t5 + 1)} /> </div>
                            <div className='font-bold p-2'><button className='px-5 py-2 text-sm bg-[#C25DC4] rounded-full' onClick={() => handleBook({
                                ticketLevel: getPost.ticketLevels.ticket5,
                                price: getPost.priceLevels.price5,
                                qty: t5,
                                id: getPost.ticketLevels.ticket5 + Date.now()

                            })} >Add</button></div>
                        </div></div>}
              </div> :
              
              <div className='flex justify-center items-center h-[400px]'>
                  <ScaleLoader color={color} loading={wait} size={150} className='pt-0"' />
          
          </div>}
          

            </div>
           
  )
}
 