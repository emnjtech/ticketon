import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SearchComponent from './SearchComponent.js'
import img from './assets/undraw_dir2.png'


export default function SearchResults() {
    const location = useLocation()
  const searchItems = location.state
  

  const [post, setPost] = useState(null)

  const [searchMatch, setSearchMatch] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchId, setSearchId] = useState("")
  

  console.log(searchText)
  const baseUrl = "http://localhost:3003/allEvents"

  useEffect(() => {
    const getPost = async () => {
     
      await axios.get(baseUrl).then((response) => {
        setPost(response.data);

      
      })
    }
    getPost()
  }, []);
  console.log(post)
  console.log(searchItems)
 const searchData = searchItems? post?.filter((item) => (
    item.title.toLowerCase().includes(searchItems.title.toLowerCase())
   && item.country.toLowerCase().includes(searchItems.country.toLowerCase())
   && item.province.toLowerCase().includes(searchItems.province.toLowerCase())
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
      
   
    let matches = post.filter((events) => {
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
    <div className='container mx-auto'>
      <h1 className='text-sm text-center p-4 font-bold'>Search events by title, venue, Perfoming Artistes/Speakers, country or category</h1>
      <div className='md:flex justify-center align-center'>
        
        <div className='w-full p-4'>
          <input type='text' placeholder='Search event by title, performing Artistes, country, state or venue' className='h-[50px] w-full 
          bg-gradient-to-r from-pink-100 p-4 text-sm outline-none shadow-2xl'
            onChange={handleChange}
            value={searchText}

          />

          {searchMatch && searchMatch.map((item)=> (
            <div className=' flex justify-start align-center p-4 h-[90px] border-b-2  cursor-pointer hover:bg-gradient-to-r shadow-xl hover:from-purple-300  bg-gradient-to-r from-purple-200 rounded-br-full'
              onClick={() => { setSearchText(item.title);  setSearchId(item.eventId)}}>
              <div className=' w-[350px]'> <h1 className='text-[10px] font-bold'>{item.title}</h1>
                <h1 className='text-[9px]'>{item.Artiste}</h1>
                <h1 className='text-[9px]'>{item.country} | {item.province}</h1>
                <h1 className='text-[8px]'>{item.venue} | {item.town}</h1>
                <h1 className='text-[8px]'>{item.category} </h1>
              
              </div>
              <div>
                <img src={item.image} alt={item.alt} className='w-[50px] h-full'/>
                </div>
            
              
            </div>
          ))    }
       
        </div>

        <div className='p-4'> 

          <button className='px-6 py-3 w-full'>Search</button>
        </div>
      </div>

      <div>
        {!searchMatch[0] && !mainSearch && <div className='mx-auto w-[40%]'>
          <h1 className='text-center'>No search results</h1>
          <img src={img} alt="search" width={500} /></div>}
        <div className='grid md:grid-cols-3 gap-4 w-[90%] mx-auto p-5'>
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

      </div>

      </div>


</div>
   
  )
}
 //: <div className='flex justify-center items-center h-[300px]'> <ClockLoader color={color} loading={wait} size={80} className='pt-0"' /></div>