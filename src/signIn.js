import React from 'react'
import { useContext } from 'react'
import TicketonContext from './context/ticketon-context'
import { Icon } from '@iconify/react';
import ProtectedRouteSignIn from './ProtectedRouteSignIn';
export default function SignIn() {
    const { signInWithGoogle, currUser } = useContext(TicketonContext)
    console.log(currUser)
    return (
        <ProtectedRouteSignIn>
            <div className='w-[90%] p-5 mx-auto'>
                <div className='w-full md:w-[50%] mx-auto bg-slate-200 rounded-lg shadow-2xl text-center pt-10'>
                    <h1 className='text-lg font-bold text-blue-300'>Sign In to continue</h1>
                    <div className='mx-auto w-[300px] h-[200px] my-auto py-[70px]'>
                        <button onClick={signInWithGoogle} className="flex p-2 w-[300px] my-auto "  ><Icon icon="flat-color-icons:google" className='text-[40px]' />
                        <h1 className='p-2 text-lg font-bold'>Sign In With Google</h1></button></div>


                </div>
            </div>
        </ProtectedRouteSignIn>
    )
}
