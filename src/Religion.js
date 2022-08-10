import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom'
import Slide from 'react-reveal/Slide';
import axios from 'axios'
import SearchComponent from './SearchComponent';
import MoonLoader from 'react-spinners/MoonLoader'
import { Icon } from '@iconify/react';

export default function Religion() {


    const location = useLocation()
    const searchValue = location.state
    const [post, setPost] = useState(null)
    const [searchMatch, setSearchMatch] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchId, setSearchId] = useState("")
    const [wait, setWait] = useState(false)
    const baseUrl = "https://ticketon-node-server.herokuapp.com/allEvents"

    useEffect(() => {
        setWait(true)
        const getPost = async () => {
            try {
                await axios.get(baseUrl).then((response) => {
                    setWait(false)
                    setPost(response.data);

                })
            }
            catch (error) {
                console.log(error)
            }
        }
        getPost()
    }, []);


    console.log(searchValue)
    const searchData = post?.filter((item) => (
        item.category.toLowerCase().includes(searchValue.toLowerCase())
    ))
    console.log(searchData)

    console.log(post)

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
                    || events.province.match(regex) || events.town.match(regex)) || events.category.match(regex)
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
            <div className='flex justify-center align-center bg-gradient-to-r from-pink-100'>
                <div className='flex justify-center p-4'>

                    <Icon icon="ic:outline-screen-search-desktop" className='text-3xl' />
                </div>
                <div className='w-full p-2 '>

                    <input type='text' placeholder='Search event by title, performing Artistes, country, state or venue' className='h-[50px] w-full 
         bg-transparent p-4 text-sm outline-none '
                        onChange={handleChange}
                        value={searchText}

                    />
                    {searchMatch && searchMatch.map((item) => (
                        <div className=' flex justify-start align-center p-4 h-[90px] border-b-2  cursor-pointer hover:bg-gradient-to-r shadow-xl hover:from-purple-300  bg-gradient-to-r from-purple-200 rounded-br-full'
                            onClick={() => { setSearchText(item.title); setSearchId(item.eventId); setSearchMatch([]) }}>
                            <div className=' w-[220px]'> <h1 className='text-[10px] font-bold'>{item.title}</h1>
                                <h1 className='text-[9px]'>{item.Artiste}</h1>
                                <h1 className='text-[9px]'>{item.country} | {item.province}</h1>
                                <h1 className='text-[8px]'>{item.venue} | {item.town}</h1>
                                <h1 className='text-[8px]'>{item.category} </h1>

                            </div>
                            <div>
                                <img src={item.image} alt={item.alt} className='w-[50px] h-full rounded-br-2xl' />
                            </div>


                        </div>
                    ))}

                </div>



            </div>

            {wait && <div className='flex justify-center items-center w-300 p-4'>

                <MoonLoader loading={wait} width={100} color="purple" />
            </div>}

            {mainSearch && <div className='grid md:grid-cols-3  gap-4 m-[50px] '>
                <SearchComponent
                    key={mainSearch.eventId}
                    title={mainSearch.title}
                    eventId={mainSearch.eventId}
                    image={mainSearch.image}
                    artiste={mainSearch.Artiste}
                    dateAndTime={mainSearch.dateAndTime}
                    town={mainSearch.town}
                    province={mainSearch.province}
                    country={mainSearch.country}
                    ticketFrom={mainSearch.ticketFrom}
                    venue={mainSearch.venue}





                />
            </div>}




            <div className='grid md:grid-cols-3 gap-4 m-[50px]'>
                <Slide top>
                    <div>
                        {searchData &&
                            searchData?.map(({
                                title,
                                eventId,
                                image,
                                Artiste,
                                dateAndTime,
                                town,
                                province,
                                country,
                                ticketFrom,
                                venue,

                            }) => (
                                <SearchComponent
                                    key={eventId}
                                    title={title}
                                    eventId={eventId}
                                    image={image}
                                    artiste={Artiste}
                                    dateAndTime={dateAndTime}
                                    town={town}
                                    province={province}
                                    country={country}
                                    ticketFrom={ticketFrom}
                                    venue={venue}





                                />
                            ))}
                    </div>
                </Slide>







            </div>
        </div>


    );
}


