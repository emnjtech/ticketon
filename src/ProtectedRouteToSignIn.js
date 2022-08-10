
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import TicketContext from "./context/ticketon-context";



export default function ProtectedRouteToSignIn({ children }) {
    const { currUser } = useContext(TicketContext)
    const navigate = useNavigate()
    if (!currUser) {
        return navigate('/signIn')
    }
    return children
}