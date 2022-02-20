import { GET_ALL_PRODUCTS} from "./actions-types";


// connexion de l'user
export const loadAllproduct = (product) => {
     console.log('loadAllProduct');
    return function(dispatch){
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: product
        })
    }
}