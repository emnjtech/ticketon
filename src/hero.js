import React,{useState,useEffect} from 'react'
import bg from './assets/bg2.jpg'
import { Icon } from '@iconify/react';
import axios from 'axios'
import { Hint } from 'react-autocomplete-hint';
import { useNavigate } from 'react-router-dom';






export default function Hero() {
    const [searchCountry, setSearchCountry] = useState([])
    const [searchProvince, setSearchProvince] = useState([])
    const [hintData, setHintData] = useState([])
    const [hintCountry, setHintCountry] = useState([])
    const [hintState, setHintState] = useState([])
    const [searchTitle, setSearchTitle] = useState('')
const navigate = useNavigate()


   const baseUrl = 'http://localhost:3003/allEvents?title'

    const getData = async () => {
        const res = await axios.get(baseUrl)
        var hintArray = []
        var countryArray = []
        var provinceArray = []
        res.data.map(a => hintArray.push(a.title))
        res.data.map(a => countryArray.push(a.country))
        res.data.map(a => provinceArray.push(a.province))
        setHintData(hintArray)
        setHintCountry(countryArray)
        setHintState(provinceArray)
        
    }
    console.log(hintData)
    console.log(hintCountry)
    console.log(hintState)


    useEffect(() => {
        getData()
    },[])


    const handleSearch = () => {
    navigate('/searchResults',{state: {title:searchTitle.toLowerCase(), province: searchProvince.toLowerCase(), country: searchCountry.toLowerCase()}})
}

    const handleHealth= () => {
        navigate('/healthAndWellness', { state: 'Health & Wellness' })
    }

    const handleMusic= () => {
        navigate('/musicConcertsFestivals', { state: 'Music Concerts & Festivals' })
    }

    const handleOutdoor = () => {
        navigate('/Picknics', { state: 'Outdoor & Picknick' })
    }

    const handleFood = () => {
        navigate('/foodAndBeverages', { state: 'Food & Beverages' })
    }

    const handleSeminars = () => {
        navigate('/seminars', { state:     'Seminars & Workshops' })
    }

    const handleReligion = () => {
        navigate('/religion', { state: 'Religion & Spiritual' })
    }



    return (

        <div className='w-[100%] '>
            <div className='relative'>
                <img src={bg} alt="bgimage" className='h-[700px] w-full' />
            </div>
            <div className='absolute right-0 left-0 mx-auto top-[200px] w-[90%] '><h1 className='text-white text-center'>EXPLORE CONCERTS AND EVENTS NEAR YOU</h1></div>
            <div className='absolute w-[90%]  md:ml-[60px] mx-[25px] top-[40%]  md:bg-white rounded-full'>

                <div className='grid md:grid-cols-3 md:h-[70px] md:gap-0 gap-4 p-3 outline-none w-full'>
                   
                   
                    <Hint options={hintData} allowTabFill allowEnterFill>
                        <input className='h-full box-border p-3 outline-none md:border-r-2 md:rounded-none 
                  rounded-t-full shadow-xl md:shadow-none  text-sm w-full'
                            value={searchTitle}
                            onChange={e => setSearchTitle(e.target.value)}
                            placeholder='Search event...'
                        />
                    </Hint>


                    <Hint options={hintCountry} allowTabFill allowEnterFill>
                    <input type="text" className=" h-full box-border p-3 outline-none md:border-r-2 md:rounded-none 
                  rounded-r-full shadow-xl md:shadow-none text-sm w-full" placeholder="Host country.."
                            value={searchCountry}
                            onChange={e => setSearchCountry(e.target.value)}
                           
                  
                        />
                    </Hint>


                    <div className='md:flex grid md:justify-between md:gap-0 gap-4 '>
                        <Hint options={hintState} allowTabFill allowEnterFill>
                        <input type="text" className="shadow-xl 
                  rounded-b-full h-full box-border p-3 outline-none md:shadow-none w-full text-sm" placeholder="Host province/state"
                                value={searchProvince}
                                onChange={e => setSearchProvince(e.target.value)}
                            />
                            
                            
                        </Hint>
                        <button className='rounded-full px-5 py-3 bg-[#C25DC4]' onClick={handleSearch}>Search</button></div>
                </div>
            </div>

            <div className='absolute w-[90%] m-auto bottom-0 md:top-[500px]  top-[500px] left-0 right-0 h-[100px]'>
                <div className='grid md:grid-cols-6 grid-cols-3 gap-x-[100px] p-3 text-white  '>
                    <div >
                        
                        <div className='flex items-center justify-center cursor-pointer' onClick={ handleSeminars} > <Icon icon="ph:projector-screen-light" className='text-7xl px-2 text-white' /></div>
                            <h1 className='md:text-[11px] text-[8px]  text-center'>SEMINARS & WORKSHOPS</h1>
                        
                    </div>
                    <div >
                       
                        <div className='flex items-center justify-center cursor-pointer' onClick={handleMusic}> <Icon icon="la:guitar" className='text-7xl  px-2 text-white' /></div>
                        <h1 className='md:text-[11px] text-[8px]  text-center'>MUSIC CONCERTS & FESTIVALS</h1>
                       
                    </div>
                    <div >
                        
                        <div className='flex items-center justify-center cursor-pointer' onClick={handleFood}> <Icon icon="dashicons:food" className='text-7xl  px-2 text-white' /></div>
                            <h1 className='md:text-[11px] text-[8px]  text-center'>FOOD & BEVERAGES</h1>
                      
                    </div>
                    <div >
                    
                        <div className='flex items-center justify-center cursor-pointer' onClick={handleReligion} > <Icon icon="bi:house-heart" className='text-7xl  px-2 text-white' /></div>
                            <h1 className='md:text-[11px] text-[8px]  text-center'>RELIGION & SPIRITUAL</h1>
                       
                    </div>
                    <div >
                      
                        <div className='flex items-center justify-center cursor-pointer' onClick={handleOutdoor}> <Icon icon="fontisto:cocktail" className='text-7xl  px-2 text-white' /></div>
                            <h1 className='md:text-[11px] text-[8px]  text-center'>OUTDOOR & PICNICK</h1>
                       
                    </div>
                    <div >
                        
                        <div className='flex items-center justify-center cursor-pointer' onClick={handleHealth}> <Icon icon="ic:outline-sports-gymnastics" className='text-7xl  px-2 text-white' /></div>
                            <h1 className='md:text-[11px] text-[8px]  text-center'>HEALTH & WELLNESS</h1>
                        
                    </div>
                </div>


            </div>
        </div>
    )
}
