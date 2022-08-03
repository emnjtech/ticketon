import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import TicketonContext from './context/ticketon-context.js';



export default function TopNavBar() {
    const { userLogout, currUser, userInfo } = useContext(TicketonContext)
    const [nav, SetNav] = useState(false)
    const handleClick = () => SetNav(!nav)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
console.log(currUser)
const navigate = useNavigate()

    const myAccountSwitch = () => {
        setIsLoggedIn(!isLoggedIn)
        //   localStorage.setItem("ACCOUNT_DROP_DOWN",JSON.stringify(isLoggedIn))
    }
    const logout = async () => {
        try {
            await userLogout()
            setIsLoggedIn(!isLoggedIn)
            localStorage.removeItem("USER_INFORMATION");

            navigate('/')


        }
        catch (e) {
            alert(e.message)
        }

    }




    return (
        <div className='w-full h-[80px] z-10 shadow-4xl bg-[#C25DC4]'>
            <div className='md:w-[90%] md:mx-auto '>

                <div className="px-4 flex md:justify-start items-center  h-[80px] w-full ">
                    <div className=' flex justify-start md:mr-32 mr-12'>
                        <Link to="/"><Icon icon="noto-v1:ticket" className='text-[55px] text-slate-100' /> </Link>
                        <div className='flex '><Link to="/"><h1 className='text-white text-2xl py-4 font-bold'>ticket</h1></Link><h1 className='py-4 text-yellow-300 font-bold text-2xl'>ON</h1></div>



                    </div>

                    <div className='hidden md:flex pr-4'>
                        <ul className='hidden md:flex justify-between text-[16px] text-white'>
                            <Link to="/searchResults" ><li className=' hover:text-slate-400 pr-8'>Search events</li></Link>
                            <Link to="/sneakersShop"><li className=' hover:text-slate-400'>Re-print ticket</li></Link>
                            <Link to="/allLeatherShoes"><li className=' hover:text-slate-400 pl-8'>About Us</li></Link>


                        </ul>
                    </div>

                    <div className='flex justify-between items-center ml-auto '>
                        {!currUser ? <div className='mr-5'><Link to="/signIn" ><h1 className=' hover:text-slate-400 md:text-sm text-[11px]'>My Account</h1></Link></div> :
                            <Icon onClick={myAccountSwitch} icon="carbon:user-avatar-filled" className='text-3xl mr-[30px] text-white'  />}
                        <div className={!isLoggedIn ? 'hidden' : 'rounded-b-full tilt-in-top-1 z-10 origin-top-right absolute right-[190px] mt-[250px] h-48 w-40 rounded-md bg-[#C25DC4] ring-1 ring-black ring-opacity-5 focus:outline-none'}
                            role="menu" aria-orientation="vertical">
                            <h1 className='font-bold pt-2 text-sm text-white text-center'>Welcome</h1><hr />




                            <h1 className='font-bold p-2 text-xs text-center'>{userInfo}</h1>
                            <Link to="/myOrder"> <button className=' bg-transparent p-0 w-full text-black'>
                                <h1 className='font-bold p-2  text-xs text-center'>MY BOOKINGS</h1>
                            </button></Link><hr />
                            <Link to="/Checkout"> <button className=' bg-transparent p-0 w-full text-black'>
                                <h1 className='font-bold p-2  text-xs text-center'>MY TICKETS</h1>
                            </button></Link><hr />
                            <button onClick={logout} className=' bg-transparent p-0 w-full text-black'>
                                <h1 className='font-bold p-2 text-xs text-center'>SIGN OUT</h1>
                            </button>

                        </div> 




                        <Link to="/create-event"><button className='rounded-full text-[#C25DC4] px-3 py-3 bg-white flex items-center md:w-[140px] w-[100px]'>
                            <Icon icon="fluent:location-add-24-filled" className='text-[##C25DC4] ' /><h1 className='text-[10px] md:text-base'>Create event</h1></button></Link>
                    </div>

                    <div className='md:hidden px-5 ' onClick={handleClick}>
                        {!nav ? <MenuIcon className='w-7 text-white' /> : <XIcon className='w-7 stroke-white' />}
                    </div>

                </div>
                {/* Mobile menu items   */}
                <ul className={!nav ? 'hidden' : 'tilt-in-top-1 absolute z-30 bg-[#C25DC4] w-[60%]rounded-xl px-8 text-center right-[0%] rounded-b-full text-white md:hidden '}>
                    <Link to="/" ><li>Home</li></Link>
                    <Link to="/sneakersShop"><li>Search events</li></Link>
                    <Link to="/allLeatherShoes"><li>Re-print ticket</li></Link>
                    <Link to="/kingsCollections"><li>About us</li></Link>

                    <div className='flex flex-col mb-4'>

                        {!currUser ? <Link to="/signIn"> <h1 className='text-[15px] text-center font-bold p-2 '>My Account</h1></Link> :
                           
                            
                            <div>
                                <hr className=' bg-white'/>

                                <h1 className='font-bold p-2 text-xs text-center text-pink-100'>{userInfo}</h1>
                                <Link to="/myOrder"> <button className=' bg-transparent p-0 w-full text-black'>
                                    <h1 className='font-bold p-2 text-xs text-center'>MY BOOKINGS</h1>
                                </button></Link><hr />
                                <Link to="/Checkout"> <button className=' bg-transparent p-0 w-full text-black'>
                                    <h1 className='font-bold p-2  text-xs text-center'>MY TICKETS</h1>
                                </button></Link><hr />
                                <button onClick={logout} className=' bg-transparent p-0 w-full text-black'>
                                    <h1 className='font-bold p-2 text-xs text-center'>SIGN OUT</h1>
                                </button>
                            </div>
                        }
                    </div>
                </ul>
            </div>
        </div>

    )
}
