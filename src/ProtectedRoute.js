import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import CommerceContext from "./context/commerce-context";



export default function ProtectedRoute({ children }) {
    const { currUser } = useContext(CommerceContext)

    if (!currUser) {
        return <Navigate to="/" />
    }
    return children
}