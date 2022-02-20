import {MODIFY_CART, CLEAN_CART} from '../actions/actions-types';

let cartLS = JSON.parse(window.localStorage.getItem('cart'));
console.log("cart",cartLS)
if(cartLS === null) {
    cartLS = []
}

let TotalPrice = calculateTotalAmount(cartLS) 
//console.log("TOTAL DU PRIX",TotalPrice)

const INITIAL_STATE = {
    cartInfos: cartLS,
    TotalPrice: TotalPrice
}

function calculateTotalAmount(cart) {
    //console.log("CALCULATETOTALAMOUNT",cart)
    let TotalPrice = 0;
    for(let i=0; i < cart.length; i++) {
        let Total = parseInt(cart[i].Price) * parseInt(cart[i].quantityInCart);
        TotalPrice += Total;
    }

    return TotalPrice
}


export default function cartReducer(state = INITIAL_STATE, action) {
    console.log(state)

    switch(action.type) {

        case MODIFY_CART:

            let TotalPrice = calculateTotalAmount(action.payload);
            //console.log(TotalPrice)

            return {cartInfos: action.payload, TotalPrice: TotalPrice}

        case CLEAN_CART:
        // console.log('reducer clean', action)
            return {cart: [], TotalPrice: 0};

        default:
            return state;

    }

    // return state;
}