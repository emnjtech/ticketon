import { ADD_T0_BOOK, DEC_QTY, EMPTY_CART, INC_QTY, REMOVE_TICKET, } from "./ticketon-action";

export const ticketonReducer = (state, action) => {
    switch (action.type) {
        case ADD_T0_BOOK:
            const itemExists = state.book.find(
                (item) => item.ticketLevel === action.payload.ticketLevel // && item.size === action.payload.size
            )

            let newItem
            if (!itemExists) {

                newItem = [...state.book, action.payload]  // ...state, basket:  [...state.basket, action.payload] 

            }
            else {

                newItem = state.book.map(item => item.ticketLevel === action.payload.ticketLevel ? { ...item, qty: item.qty + 1 } : { ...item })

            }
            return {
                ...state,
                book: newItem
            }

        case REMOVE_TICKET:
            const index = state.book.findIndex(
                (ticket) => ticket.ticketLevel === action.payload
            );

            let newBook = [...state.book];

            if (index >= 0) {
                newBook.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product(id: ${action.payload}) as its not in the basket!`
                )
            }

            return {
                ...state,
                basket: newBook
            }


        /*     return {
                 ...state,
                 basket: state.basket.filter( item => item.id !== action.payload)
             } */

        case INC_QTY:
            return {
                ...state,
                basket: state.basket.map(item => item.id === action.payload ? { ...item, qty: item.qty + 1 } : { ...item })
            }
        case DEC_QTY:
            return {
                ...state,
                basket: state.basket.map(item => item.id === action.payload ? { ...item, qty: item.qty - 1 } : { ...item })
            }
        case EMPTY_CART:
            return {
                ...state,
                basket: []

            }

        default:
            return state
    }

}

/* 
            let newBasket = [...state.basket]

            if (index > 0) {
                newBasket.splice(index,1)
 
            }
            else {
                alert("can't remove product")
            } 
            
            
             ...state,
                basket: state.basket.filter(item => item.id !== action.payload)*/