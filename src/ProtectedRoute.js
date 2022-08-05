
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import TicketContext from "./context/ticketon-context";



export default function ProtectedRoute({ children }) {
    const { currUser } = useContext(TicketContext)
const navigate = useNavigate()
    if (!currUser) {
        return navigate(-1)
    }
    return children
}