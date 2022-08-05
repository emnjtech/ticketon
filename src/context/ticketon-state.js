import React from "react";
import { ADD_T0_BOOK, REMOVE_TICKET, INC_QTY, DEC_QTY, EMPTY_CART, } from "./ticketon-action";
import { useReducer, useEffect,useState} from "react";
import TicketonContext from "./ticketon-context";
import {ticketonReducer} from './ticketon-reducer'
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, provider } from '../firebaseConfig'


const storageKey = "localCart";

const InitialState = {
    book: [], //id, title,price,image
}


// add to cart



export default function TicketonState(props) {
    const [state, dispatch] = useReducer(ticketonReducer, InitialState, (initial) => JSON.parse(localStorage.getItem(storageKey)) || initial)
    const [currUser, setCurrUser] = useState({})
    const [userInfo, setUserInfo] = useState("")
    

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
   
                setCurrUser(currentuser)   
        })
              
         return () => unsubscribe()     
    },[currUser]) 
    
const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem('USER_INFORMATION', JSON.stringify(result.user.displayName));
                window.location.reload(true)
                   
                })       
            .catch((error) => {
                alert(error)
            })
    }  

    /*useEffect(() => {
        localStorage.setItem('USER_INFORMATION', JSON.stringify(userInfo));
        console.log(userInfo)

    }, [userInfo]);
*/
   useEffect(() => {
        const data = JSON.parse(localStorage.getItem('USER_INFORMATION'));
        if (data !== null) setUserInfo(data);
        setUserInfo(data)
        

    }, [userInfo]);
    


    const userLogout = () => {
        return signOut(auth)
    }
    const incQty = (itemID) => {
        dispatch({
            type: INC_QTY,
            payload: itemID
        })
    }

useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state]);

    const totalQty = state.book?.reduce((totalQty, item) => {
        return totalQty + (item.qty)
    }, 0) 



    const decQty = (itemID) => {
        dispatch({
            type: DEC_QTY,
            payload:itemID
            
        })
    }
    const addToBook = (item) => {
        dispatch({
            type: ADD_T0_BOOK,
            payload: item

        })
    }

    const removeTicket = (ticketLvl) => {
        dispatch({
            type: REMOVE_TICKET,
            payload: ticketLvl
        })
    }

    const emptyCart = () => {
        dispatch({
            type:EMPTY_CART
        })
    }

  return (
   
      <TicketonContext.Provider value={{
          book: state.book,
          addToBook,
          removeTicket,
          incQty,
          decQty,
          emptyCart,
          totalQty,
          currUser,
          signInWithGoogle,
          userLogout,
          userInfo

      }}>
          {props.children}
      </TicketonContext.Provider>
      
      
      
  )
}
