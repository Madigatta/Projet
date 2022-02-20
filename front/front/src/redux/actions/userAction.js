import { CONNECT_USER, LOGOUT_USER} from "./actions-types";


// connexion de l'user
export const loadUser = (user) => {
    // console.log('loadUser');
    return function(dispatch){
        dispatch({
            type: CONNECT_USER,
            payload: user
        })
    }
}

// déconnexion de l'user
export const logoutUser = () =>{
     console.log('logoutUser');
    return function(dispatch){
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}