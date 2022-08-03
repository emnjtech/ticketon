import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import TicketonContext from "./context/ticketon-context";



export default function ProtectedRouteSignIn({ children }) {
    const { currUser } = useContext(TicketonContext)

    if (currUser) {
        return <Navigate to="/" />
    }
    return children
}