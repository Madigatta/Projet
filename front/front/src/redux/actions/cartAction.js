import {MODIFY_CART, CLEAN_CART} from '../actions/actions-types';

// ajout des articles dans le basket
export const addToCart = (cart, newProduct, quantityInCart) => {
    console.log(  "ajouter au panier",addToCart)
    
    return function(dispatch){
        console.log(dispatch)
        // si on trouve un produit same renvoie un index, sinon -1
        let same = cart.findIndex((b)=> b.id === newProduct.id);
		if(same === -1) {
            console.log(same)
            // dans ce cas le produit n'existe pas on l'ajoute au 
            // tableau basket
            newProduct.quantityInCart = parseInt(quantityInCart);
            cart.push(newProduct);
        } else {
            // sinon on ajoute juste la quantityInCart
            cart[same].quantityInCart += parseInt(quantityInCart);
        }
        
        // on ajoute avant redux le localstorage
        let cartLS = JSON.stringify(cart);
        window.localStorage.setItem('cart', cartLS);
        
        // on envoie le cart à redux
        dispatch({
            type: MODIFY_CART,
            payload: cart
        })
    }
    
}

// on supprime un article du panier
export const deleteCart = (cart, product)=>{
    console.log("delete",cart)
    return function(dispatch) {
        // filter recréé un nouveau tableau en fonction de la condition
        //product.id !== product.id
        let newCart = cart.filter(product => product.id !== product.id);
        
       
        let cartLS = JSON.stringify(newCart);
        window.localStorage.setItem('cart', cartLS);
        
        dispatch({
            type: MODIFY_CART,
            payload: newCart
        })
    }
}

export const cleanCart = ()=>{
    console.log('action clean')
    return function(dispatch){
        dispatch({
            type: CLEAN_CART,
            payload: null
        })
    }
}