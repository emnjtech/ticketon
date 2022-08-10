import React,{useEffect,useState,useContext, createRef} from 'react'
import TicketonContext from './context/ticketon-context';
import { useLocation,useNavigate  } from 'react-router-dom';
import Pdf from "react-to-pdf";
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";
export default function GenerateReceipt() {
  
const ref = createRef()
  const location = useLocation()
  const bookBasket = location.state
  const [color,setColor] = useState("purple")
  const [loading, setLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")

  const { currUser } = useContext(TicketonContext)
  const navigate = useNavigate()
  
useEffect(() => {
    if (currUser) {
      setLoading(true)
      bookBasket?.map(item => (
        axios
          .post("http:https://ticketon-node-server.herokuapp.com/generateTickets", {
            eventId: item.eventId,
            title: item.title,
            image: item.image,
            ticketId: item.ticketId,
            ticketLevel: item.ticketLevel,
            pricePerTicket: item.pricePerTicket,
            qty: item.qty,
            userId: currUser.email,
            venue: item.venue,
            country: item.country,
            province: item.province,
            dateAndTime:item.dateAndTime

          }).then(function (response) {
            setLoading(false)
            setColor('white')
            //  setUploadSuccess(true)
            console.log(response);
            //   navigate('/eventSummary/:eventId',{state:eventId})
          }).catch(function (errors) {
            setErrorMessage(errors)
            console.log(errorMessage);

          })
      ))
    
    }

    else {
      navigate("/signIn")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



    return (
      
      <div className='container mx-auto md:w-[60%] w-full p-4'>
        {loading && <div className='flex justify-center items-center h-[300px] mt-7' >
          <MoonLoader color={color} loading={loading} size={100} className='pt-0"' />
        </div>}
        
        {!loading && <div>
          
        <h1 className='text-green-500 text-center p-4'> It's all Ready, Print/Download your tickets </h1>
        {bookBasket?.map((item) => (
          <div className='p-4 w-full md:h-[300px] h-[300px] bg-slate-50 ' key={item.eventId} ref={ref}>
            <div className='p-2 border-dotted border-4 border-orange-600 flex'>

            <div>  <img src={item.image} alt={item.title} className='w-[160px] h-[190px] p-2 rounded-2xl'/></div>

           
            
            <div className='p-2 w-full'>
                <div className=' bg-gradient-to-r from-amber-500 to-amber-700 w-full'><h1 className='font-bold  text-[20px]] p-2 mb-2'> Ticket for {item.title}</h1></div>
                <h1 className='font-bold text-[10px]'> Event Id: {item.eventId}</h1>
                <h1 className='font-bold text-[10px]'> Ticket Id: {item.ticketId}</h1>
                <h1 className='font-bold text-[10px]'> Ticket for: {item.qty}</h1>
                <h1 className='font-bold text-[10px]'> Buyer: {item.userId}</h1>
                <h1 className='font-bold text-[10px]'> Amount Paid: ${item.pricePerTicket * item.qty}</h1>
                <h1 className='font-bold text-[10px]'> Venue: {item.venue}, {item.province}, {item.country}</h1>
                <h1 className='font-bold text-[10px]'> Date: {item.dateAndTime}</h1>
                <div><h1 className='font-bold text-3xl text-amber-500'>{item.ticketLevel} </h1></div>



            </div>
         
            </div>
            <div className='flex items-center justify-center'>
              <Pdf targetRef={ref} filename={item.eventId + item.ticketId}>
              {({ toPdf }) => <button onClick={toPdf} className='px-5 py-3 bg-black mt-2'>Download </button>}
            </Pdf> </div>
          </div>
        ))
        }

            

        </div>}
    </div>
  )
}
