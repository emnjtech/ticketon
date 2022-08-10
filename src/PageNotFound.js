import React from 'react'
import error from './assets/404b.png'
import {Link} from 'react-router-dom'
export default function PageNotFound() {
  return (
      <div className='md:w-full  mx-auto bg-slate-200 w-full rounded-2xl pb-10 mb-8 md:mb-8'>
          <div className='w-full p-auto justify-center'>
              <img src={error} className=' mx-auto' alt='error 404' />
          </div>
          <h1 className='text-2xl font-bold text-center'>Oops! You shouldn't be here.</h1>
          <h1 className='text-[15px] text-center px-4 '>You are trying to access a page that does not exist. <br/>
              <Link to="/" className='font-bold text-blue-500' >Go back Home</Link> </h1>
          

      </div>

  )
}
