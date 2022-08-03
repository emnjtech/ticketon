import React,{useState,useEffect,useContext} from 'react'
import { UploadIcon, PlusCircleIcon} from '@heroicons/react/outline';
import eventCategory from './eventCategory'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import RotateLoader from "react-spinners/RotateLoader";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse'
import { Icon } from '@iconify/react';
import {Link, useNavigate} from 'react-router-dom'
import TicketonContext from './context/ticketon-context';


export default function CreateEvent() {
    let [color, setColor] = useState("yellow");
    const [title,setTitle] =useState("")
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const [eventDateTime, setEventDateTime] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [showTicketLevels, setShowTicketLevels] = useState(false)
    const [category,setCategory] = useState("")
    const [inputs, setInputs] = useState({})
    const [baseImage, setBaseImage] = useState("");
    const [previewObj, setPreviewObj] = useState("");
    const [open, setOpen] = useState(true);
    const [errorMessage,setErrorMessage] = useState("")
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState("")
    const { currUser } = useContext(TicketonContext)
    const navigate = useNavigate()


    const getData = async () => {
        
        try {
            const res = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
            // var countryData = []
            // res.data.map(a => countryData.push(a.name))
            setCountryList(res.data)
        } catch (error) {
            setErrorMessage("API error, please try again")
        }
        
        
            }

    const countryData = {
        country: selectedCountry
    }
    const getState = () => {

        if (selectedCountry) {

            axios.post('https://countriesnow.space/api/v0.1/countries/states', countryData)
                .then(function (response) {

                    setStateList(response.data);
                    
                    //   navigate('/eventSummary/:eventId',{state:eventId})
                }).catch(function (errors) {
                    setErrorMessage(errors)
                    console.log(errorMessage);

                    // var countryData = []
                    // res.data.map(a => countryData.push(a.name))

                })
        }

    }
    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        getState()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedCountry] )

    console.log(selectedCountry)

    console.log(stateList? stateList.data.states.map(item => item.name): "")
  console.log(countryList.data)
    
      //  console.log(stateList? stateList:"")

    const uploadImage = async (e) => {
        const file = e.target.files[0];

        const base64 = await convertBase64(file);
        setBaseImage(base64);

    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
console.log(currUser.email)
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

  

    const handleShowTicketLeveles = () => {
        setShowTicketLevels(!showTicketLevels)
    }
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    

    const eventId = title ? title.replace(/[^a-zA-Z0-9]/g, "_") + Date.now() : ""


    const handlePreview = (event) => {
        event.preventDefault()
        const obj = {
            createdBy: currUser.email,
            eventId: eventId,
            title: title,
            Artiste: inputs.artiste,
            image: baseImage,
            description: inputs.description,
            alt: title,
            dateCreated: Date.now(),
            ticketFrom: inputs.ticketFrom,
            venue: inputs.venue,
            category: category,
            town: inputs.town,
            province: selectedState,
            country: selectedCountry,
            dateAndTime: eventDateTime,
            totalTicketsRemaining: inputs.ticketsRemaining,
            ticketLevels: {
                ticket1: inputs.ticketLevel1,
                ticket2: inputs.ticketLevel2,
                ticket3: inputs.ticketLevel3,
                ticket4: inputs.ticketLevel4,
                ticket5: inputs.ticketLevel5,
            },
            priceLevels: {
                price1: inputs.ticketFrom,
                price2: inputs.ticketRate2,
                price3: inputs.ticketRate3,
                price4: inputs.ticketRate4,
                price5: inputs.ticketRate5,
            }
        }
        setPreviewObj(obj)
      
} 
  
    
    const handleSubmit = (e) => {
        e.preventDefault();       
        setLoading(true)
       axios
           .post("http://localhost:3003/createEvent", previewObj)
           .then(function (response) {
               
               setLoading(false)
               setColor('white')
               setUploadSuccess(true)
               console.log(response);
               navigate(`/eventSummary/${eventId}`)

            //   navigate('/eventSummary/:eventId',{state:eventId})
            }).catch(function (errors) {
               setErrorMessage(errors)
                console.log(errorMessage);

            });
    
        setInputs({
            title: "",
            artiste:"",
            description: "",
            ticketFrom: "",
            venue: "",
            town: "",
            ticketsRemaining:"",
                ticketLevel1:"",
                ticketLevel2:"",
                ticketLevel3:"",
                ticketLevel4:"",
                ticketLevel5:"",

                ticketRate1:"",
                ticketRate2:"",
                ticketRate3:"",
                ticketRate4:"",
                ticketRate5:"",
        })
        setTitle("")
        setBaseImage("")
        setSelectedCountry("")
        setSelectedState("")
        setShowTicketLevels("")
        setCategory("")
        setPreviewObj("")
    }

    /* const createUser = (e) => {
        
         userDetails();
         uploadPhoto();
     }*/

  return (
      <div className='container mx-auto'>
          <div className='p-3 flex justify-center items-center'> {uploadSuccess ? <Stack sx={{ width: '100%', height: '50px' }} spacing={2}>
              <Collapse in={open}>
                  <Alert sx={{ width: '100%', height: '50px', fontSize:'15px', textAlign: 'center' }}
                      action={
                          <IconButton
                              aria-label="close"
                              color="inherit"
                              size="medium"
                              onClick={() => {
                                  setOpen(false);
                              }}
                          >
                              <CloseIcon fontSize="inherit" />
                          </IconButton>
                      }

                      severity="success">This is a success alert —<Link to={`/eventSummary/${eventId}`}><b> check it out!</b></Link></Alert>
              </Collapse>
          </Stack> : ""}</div>
          <div className='md:flex justify-between'>
              <div className=' md:w-[60%] p-4 rounded-3xl'>
                
                  
                  <div className='w-full bg-pink-200 p-8'>
                      <form onSubmit={handlePreview} >
                      <label for="fname" className='text-sm'>Event's theme:</label>
                      <input required type="text"  placeholder="Enter the theme/title of your event"
                              className='w-full text-sm p-3 box-border mb-4 mt-1 rounded-xl'
                              name="title"
                              value={title || ""}
                              onChange={(e) =>setTitle(e.target.value)}
                      />

                      <label for="venue" className='text-sm'>Event's venue:</label>
                      <input required type="text" placeholder="Enter the venue of your event"
                              className='w-full text-sm p-3 box-border mb-4 mt-1 rounded-xl'
                              name="venue"
                              value={inputs.venue}
                              onChange={handleChange}
                          />
                         <div className='mb-8'> <p className='text-[14px] py-2'>Event's Date & time:</p>
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DateTimePicker
                                      renderInput={(props) => <TextField {...props} />}
                                      //label="DateTimePicker"
                                      value={eventDateTime}
                                      onChange={(newValue) => {
                                          setEventDateTime(newValue);
                                      }}
                                      minDate={new Date(Date.now())}
                                     // minTime={new Date(Date.now())}
                                     // maxTime={new Date(0, 0, 0, 18, 45)}
                                  />
                              </LocalizationProvider>
                          </div>
                      
                      <label for="fname" className='text-sm'>Keynote speakers/Performing Artiste(s):</label>
                      <input type="text" placeholder="Speakers/Artistes (seperate with comma)"
                              className='w-full text-sm  p-3 box-border mb-4 mt-1 rounded-xl'
                              name="artiste"
                              value={inputs.artiste}
                              onChange={handleChange}
                          />
                          
                          <select value={category} onChange={(e) => setCategory(e.target.value)}
                              className=' w-full text-sm p-3 box-border mb-4 mt-6 outline-none bg-transparent border-b-2
                           border-slate-500 text-slate-500 '>

                              <option value={null}>--Category--</option> <hr />
                              {eventCategory.map((item) => (
                                  <option value={item} >{item}</option>

                              ))}
                          </select>
                      

                      <p className='text-sm'>Upload event poster</p>
                     <div className='flex justify-between items-center border-2 rounded-xl'>  <label for="file-upload" className='px-3 py-3 bg-white 
                      inline-block cursor-pointer rounded-full text-purple-500 shadow-xl shadow-inset-center'>
                          <UploadIcon className='text-sm w-[40px]' /></label>
                              <input id="file-upload" type="file" onChange={(e) => uploadImage(e)} required />
                              {baseImage ? <img src={baseImage} alt="Upload" className=' w-[170px] h-[200px]' /> : ""}
                          </div>
                      <p className='text-sm text-slate-600'><i>(Max: 5mb)</i></p>
                      
                      
                      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
                          className=' w-full text-sm p-3 box-border mb-4 mt-6 outline-none bg-transparent border-b-2
                           border-slate-500 text-slate-500 '>
                          
                          <option value={null}>--Choose Country--</option> 
                              {countryList.data?.map(item => 
                                  <option value={item.name} >{item.name}</option>

                            )}
                         
                          </select>

                          <label for="fname" className='text-sm'>Town or Area:
                          </label>
                          <input type="text" placeholder="Enter a brief direction to your venue"
                              name="town" value={inputs.town} onChange={handleChange}
                              className='w-full p-3 box-border mb-2 mt-1 text-sm rounded-xl'
                          />



                          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                              className=' w-full text-sm p-3 box-border mb-4 mt-3 outline-none bg-transparent border-b-2
                           border-slate-500 text-slate-500 '>

                              <option value={null}>--Choose State/Province--</option> 
                          {stateList? stateList.data.states.map(item =>
                                 <option value={item.name} >{item.name}</option>
                              ):""}

                          </select>
                          
                         
                      <label for="fname" className='text-sm'>Description:<span className='text-slate-500 text-[12px]'><i>(optional)</i></span></label>
                          <textarea placeholder="Here is an opportunity to sell your event with a brief explanation" 
                              name="description" value={inputs.description} onChange={handleChange}
                          className='w-full text-sm p-3 box-border mb-4 mt-1 rounded-xl outline-none' maxLength="500" />
                     
                      <div className='flex justify-between'>   <div><label className='text-sm'>Number of tickets available</label><br/>
                              <input type="number" placeholder="e.g:1000"
                                  name="ticketsRemaining" value={inputs.ticketsRemaining} onChange={handleChange}
                              className='w-50 p-3 box-border text-sm mb-4 mt-1 rounded-xl outline-none' required/><br />
                      </div>
                      
                          <div> <label className='text-sm'>Lowest ticket price ($)</label><br />
                                  <input type="number" placeholder="Lowest ticket rate"
                                      name="ticketFrom" value={inputs.ticketFrom} onChange={handleChange}
                                  className='w-50 p-3 box-border text-sm mb-1 mt-1 rounded-xl outline-none' /><br />
                              <span className='text-slate-500 text-[12px]'><i>(For free event leave empty)</i></span>
                      </div>
                      </div> 
                         

                      <div className='flex justify-between items-center mt-5'>
                              <h1 className='text-center font-bold text-lg'>Ticket Levels</h1><PlusCircleIcon onClick={handleShowTicketLeveles}
                                  className='w-9 cursor-pointer' />
                      </div><hr className='top-[20'/>
                      

                          <div className={!showTicketLevels ? 'hidden' : 'flex justify-between tilt-in-top-1  mb-6'}>   <div>
                              <label className='text-sm'>Ticket Level</label><br />
                              <input type="text" placeholder="Regular"
                                  className='w-full p-1 box-border mb-1 mt-1 text-[11px]  outline-none'
                                  name="ticketLevel1" value={inputs.ticketLevel1} onChange={handleChange} /><br />
                          <input type="text" placeholder="VIP"
                                  className='w-full p-1 box-border mb-1 mt-1 text-[11px]  outline-none'
                                  name="ticketLevel2" value={inputs.ticketLevel2} onChange={handleChange}
                              /><br />
                          <input type="text" placeholder="VVIP"
                                  className='w-full p-1 box-border mb-1 mt-1 text-[11px]  outline-none'
                                  name="ticketLevel3" value={inputs.ticketLevel3} onChange={handleChange}
                              /><br />
                          <input type="text" placeholder="SILVER"
                                  className='w-full p-1 box-border mb-1 mt-1 text-[11px]  outline-none'
                                  name="ticketLevel4" value={inputs.ticketLevel4} onChange={handleChange}
                              /><br />
                          <input type="text" placeholder="GOLD"
                                  className='w-full p-1 box-border mb-1 mt-1 text-[11px]  outline-none'
                                  name="ticketLevel5" value={inputs.ticketLevel5} onChange={handleChange}
                              /><br />
                      </div>

                          <div> <label className='text-sm'>Ticket price ($)</label><br />
                                  <input type="number" placeholder="Ticket rate"
                                      name="ticketFrom" value={inputs.ticketFrom} onChange={handleChange}
                                  className='full p-1 box-border mb-1 mt-1 text-[11px] outline-none' /><br />
                                  <input type="number" placeholder="Ticket rate"
                                      name="ticketRate2" value={inputs.ticketRate2} onChange={handleChange}
                                  className='full p-1 box-border mb-1 mt-1 text-[11px] outline-none' /><br />
                                  <input type="number" placeholder="Ticket rate"
                                      name="ticketRate3" value={inputs.ticketRate3} onChange={handleChange}
                                  className='full p-1 box-border mb-1 mt-1 text-[11px] outline-none' /><br />
                                  <input type="number" placeholder="Ticket rate"
                                      name="ticketRate4" value={inputs.ticketRate4} onChange={handleChange}
                                  className='full p-1 box-border mb-1 mt-1 text-[11px] outline-none' /><br />
                                  <input type="number" placeholder="Ticket rate"
                                      name="ticketRate5" value={inputs.ticketRate5} onChange={handleChange}
                                  className='full p-1 box-border mb-1 mt-1 text-[11px] outline-none' /><br />
                              
                          </div>
                          </div>


                          

                          <button className='rounded-full w-full bg-[#C25DC4] px-6 py-3'>Preview</button>
                         
                              </form>
                   </div>
              </div>

              <div className='md:w-[40%] w-full roll-in-blurred-left p-4'>
                  
                 {previewObj? <div>
                      <div className='flex justify-between' >
                          <div className=" w-full  ">
                              {/*"   <!-- div with ribbon -->"*/}

                              <div className="relative bg-white border w-full shadow-2xl">
                                  <img src={previewObj.image}
                                      alt={previewObj.title} className='w-full h-[500px]' />
                                  <div className='p-5'>

                                      <div className='flex items-center mb-3'>
                                          <Icon icon="ic:baseline-event-available" className='text-xl mx-3' />
                                          <h1 className='text-lg font-bold'>{previewObj.title}</h1>
                                      </div>
                                      <div className='flex items-center mb-3'>
                                          <div><Icon icon="carbon:location-filled" className='text-lg mx-3' /></div>
                                          <div><h1 className='text-[10px]'>{previewObj.town},  {previewObj.province}, {previewObj.country}</h1></div>
                                      </div>
                                      <div className='flex items-center mb-3'>
                                          <div><Icon icon="cil:house" className='text-lg mx-3' /></div>
                                          <div><h1 className='text-[10px] '>{previewObj.venue}</h1></div>
                                      </div>
                                      <div className='flex items-center mb-3'>
                                          <div><Icon icon="healthicons:i-schedule-school-date-time-outline" className='text-lg mx-3' /></div>
                                          <div><h1 className='text-[10px] '>{JSON.stringify(previewObj.dateAndTime)}</h1></div>
                                      </div>


                                  </div>


                                  {/*"  <!-- end ribbon container -->"*/}
                              </div>
                              <div className='w-full border-2 my-7 shadow-2xl' >
                                  <h1 className='py-3 px-2'>{previewObj.totalTicketsRemaining} TICKETS REMAINING</h1>


                              </div>
                              {/*" <!-- end div with ribbon -->"*/}
                          </div>





                      </div>
                      <hr />
                      <div className=' overflow-clip h-[100px]'>
                          <p>
                             {previewObj.description}
                          </p>
                          <hr />
                      </div>
                      <div className='w-full grid grid-cols-3' >
                          <div className='pt-5'>
                              {previewObj.ticketLevels.ticket1 ? <><div className='font-bold p-2 bg-slate-100 '>{previewObj.ticketLevels.ticket1}</div> <br /></> : ""}
                              {previewObj.ticketLevels.ticket1 ? <><div className='font-bold p-2  bg-slate-100 '>{previewObj.ticketLevels.ticket2}</div><br /></> : ""}
                              {previewObj.ticketLevels.ticket1 ? <><div className='font-bold p-2  bg-slate-100 '>{previewObj.ticketLevels.ticket3}</div> <br /></> : ""}
                               {previewObj.ticketLevels.ticket1 ? <><div className='font-bold p-2  bg-slate-100 '>{previewObj.ticketLevels.ticket4}</div> <br /></> : ""}
                               {previewObj.ticketLevels.ticket1 ? <><div className='font-bold p-2  bg-slate-100 '>{previewObj.ticketLevels.ticket5}</div> <br /></> : ""}
                          </div>
                          <div className='pt-5'>
                              {previewObj.priceLevels.price1 ? <><div className='font-bold p-2 bg-slate-100 '>${previewObj.priceLevels.price1 }</div> <br /></> : ""}
                              {previewObj.priceLevels.price2 ? <><div className='font-bold p-2  bg-slate-100 '>${previewObj.priceLevels.price2}</div><br /></>:""}
                              {previewObj.priceLevels.price3 ? <><div className='font-bold p-2  bg-slate-100 '>${previewObj.priceLevels.price3}</div><br /></>:""}
                              {previewObj.priceLevels.price4 ? <><div className='font-bold p-2  bg-slate-100 '>${previewObj.priceLevels.price4}</div><br /></> : ""}
                              {previewObj.priceLevels.price5 ? <div><div className='font-bold p-2  bg-slate-100 '>${previewObj.priceLevels.price5}</div><br /></div>: ""}
                          </div>

                         


                      </div>
                      <div className='mx-auto'>
                          <button onClick={handleSubmit} className='rounded-full w-full bg-[#C25DC4] px-6 py-3'>
                              {loading ? <span className='flex justify-center items-center '>
                                  <RotateLoader color={color} loading={loading} size={10} className='pt-0"' />
                                  <h1 className='ml-10'>Please wait</h1></span> : "Submit"}</button>
                          
                      </div>



                  </div> : ""}
            </div>
          </div>
    </div>
  )
}
