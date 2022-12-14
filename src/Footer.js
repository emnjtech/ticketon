import React from 'react'

import { FaHome, FaLinkedin } from "react-icons/fa";
import { FaPhoneSquare, FaGithub, FaTwitter} from 'react-icons/fa';


//import emailjs from 'emailjs-com'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide'

export default function Footer() {

 

   /* const onSubmit = (e) => {
        e.preventDefault();
        if (toSend.message.trim().length === 0 || toSend.from_name.trim().length === 0 || toSend.subject.trim().length === 0) {
            toast('No field should be left empty');
            return
        }
    } */
    return (
        <div className="w-full md:w-full  bg-[#C25DC4] px-7 mt-[200px] py-14" >
            <div className=' md:flex justify-between   px-4 w-full '>
                <Slide>
                    <div className=' md:w-[20%] w-full '>

                        <h1 className='text-sm md:text-sm font-bold  text-slate-300'> MENU </h1>
                        <ul className=' text-white font-bold text-[11px] '>

                            
                            <Link to="/Checkout"><li>Search Events</li></Link>
                            <Link to="/designs"><li>Re-print tickets</li></Link>
                            <a href="https://emnj.tech" target="_blank" rel="noreferrer"><li>About Developer</li></a>


                        </ul>
                    </div>
                </Slide>




                  <Slide>

                <div>
                    <h1 className='   font-bold text-sm text-slate-300'>Connect with Developer</h1>

                    <div className='flex md:flex justify-start  '>
                            <a href="https://github.com/emnjtech/" rel="noreferrer" target="_blank"><FaGithub className='w-9 h-9 m-2' /></a>
                            <a href="www.linkedin.com/in/themartinzjr" rel="noreferrer" target="_blank"><FaLinkedin className='w-9 h-9 m-2' /> </a>
                            <a href="https://emnj.tech" rel="noreferrer" target="_blank"><FaTwitter className='w-9 h-9 m-2' /> </a>

                    </div>
                    <h1 className=' font-bold text-sm text-white'> <a href="https://emnj.tech" target="_blank" rel="noreferrer">About Developer</a></h1>


                </div>
                </Slide>
              
                <Slide right>
                    <div className=' md:w-[30%] w-full '>
                        <h1 className=' font-bold text-sm text-slate-300'>ADDRESS</h1>
                        <div className='mt-3 flex justify-start items-center'> <FaHome className='text-white w-6 h-6' />
                            <p className='text-white text-[12px] px-2'><b>Head Office:</b> Shop B02 Head Office street. Head Office Building, Lagos, Nigeria</p>
                        </div>




                        <div className='mt-3 flex justify-start items-center'> <FaHome className='text-white  w-4 h-4 ' />
                            <p className='text-white text-[12px] px-2'><b>Branch Office:</b> Shop 100 Branch Office Building, Abuja, Nigeria</p>
                        
                        </div>


                        <div className='mt-3 flex justify-start items-center'> <FaPhoneSquare className='text-white  w-4 h-4' />
                            <p className='text-white text-[12px] px-2'>+234111222333444555, +234222333444555</p></div>
                       

                    </div>
                </Slide>



            </div>



        </div>
    )
}
