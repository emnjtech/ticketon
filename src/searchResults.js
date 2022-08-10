import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SearchComponent from './SearchComponent.js'
import img from './assets/undraw_dir2.png'
import { Icon } from '@iconify/react';
export default function SearchResults() {
    const location = useLocation()
  const searchItems = location.state
  

  const [post, setPost] = useState(null)

  const [searchMatch, setSearchMatch] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchId, setSearchId] = useState("")
  

  console.log(searchText)
  const baseUrl = "https://ticketon-node-server.herokuapp.com/allEvents"

  useEffect(() => {
    const getPost = async () => {
      try {
       
     
      await axios.get(baseUrl).then((response) => {
        setPost(response.data);

      
      })
      }
      catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, []);
  console.log(post)
  console.log(searchItems)
 
  
 const searchData = searchItems? post?.filter((item) => (
    item.title.toLowerCase().includes(searchItems.title.toLowerCase())
   || item.country.toLowerCase().includes(searchItems.country.toLowerCase())
   || item.province.toLowerCase().includes(searchItems.province.toLowerCase())
  )) : ""
  console.log(searchData)

  const mainSearch = searchId && post?.find((item) => (item.eventId === searchId))
  console.log(mainSearch)

  const searchEvents = (text) => {
    if (!text) {
      setSearchMatch([])
      setSearchText("")
    }
    else {
      
   
    let matches = post?.filter((events) => {
      const regex = new RegExp(`${text}`, "gi")
      return (events.title.match(regex) || events.venue.match(regex) || events.Artiste.match(regex) || events.country.match(regex)
        || events.province.match(regex) || events.town.match(regex) ) || events.category.match(regex)
    })
      setSearchMatch(matches)

    }
}

  const handleChange = (e) => {
    searchEvents(e.target.value)
    setSearchText(e.target.value)
}

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-sm text-center p-4 font-bold'>Search events by title, venue, Perfoming Artistes/Speakers, country or category</h1>
      <div className=' flex justify-center align-center  bg-gradient-to-r from-pink-100'>
        <div className='flex justify-center p-4'>

          <Icon icon="ic:outline-screen-search-desktop" className='text-3xl' />
        </div>
        <div className='w-full p-2 '>
          
          <input type='text' placeholder='Search event by title, performing Artistes, country, state or venue' className='h-[50px] w-full 
         bg-transparent p-4 text-sm outline-none '
            onChange={handleChange}
            value={searchText}

          />

          {searchMatch && searchMatch.map((item)=> (
            <div className=' flex justify-start align-center p-4 h-[90px] border-b-2  cursor-pointer hover:bg-gradient-to-r shadow-xl hover:from-purple-300  bg-gradient-to-r from-purple-200 rounded-br-full'
              onClick={() => { setSearchText(item.title); setSearchId(item.eventId); setSearchMatch([]) }}>
              <div className='w-[220px] '> <h1 className='text-[10px] font-bold'>{item.title}</h1>
                <h1 className='text-[9px]'>{item.Artiste}</h1>
                <h1 className='text-[9px]'>{item.country} | {item.province}</h1>
                <h1 className='text-[8px]'>{item.venue} | {item.town}</h1>
                <h1 className='text-[8px]'>{item.category} </h1>
              
              </div>
              <div >
                <img src={item.image} alt={item.alt} className='w-[50px] h-full rounded-br-2xl'/>
                </div>
            
              
            </div>
          ))    }
       
        </div>

        
      </div>

      <div>
        {!searchData && !mainSearch && <div className='mx-auto md:w-[40%] w-full'>
          
          <img src={img} alt="search" width={500} /></div>}
        <div className='grid md:grid-cols-3 gap-4 w-[90%] mx-auto p-5'>

          {mainSearch && <div>
            <SearchComponent
              key={mainSearch.eventId}
              eventId={mainSearch.eventId}
              image={mainSearch.image}
              artiste={mainSearch.Artiste}
              title={mainSearch.title}
              province={mainSearch.province}
              country={mainSearch.country}
              venue={mainSearch.venue}
              town={mainSearch.town}
              dateAndTime={mainSearch.dateAndTime}
              ticketFrom={mainSearch.ticketFrom}
              alt={mainSearch.alt} />

          </div>}

        {searchData && searchData.map(item => (<div> 
        <SearchComponent
            key={item.eventId}
            eventId={item.eventId}
            image={item.image}
            artiste={item.Artiste}
            title={item.title}
            province={item.province}
            country={item.country}
            venue={item.venue}
            town={item.town}
            dateAndTime={item.dateAndTime}
            ticketFrom={item.ticketFrom}
            alt={item.alt} /> 

        </div>))}
      
      

      </div>

      </div>


</div>
   
  )
}
 //: <div className='flex justify-center items-center h-[300px]'> <ClockLoader color={color} loading={wait} size={80} className='pt-0"' /></div>