import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../api/user";
import { loadUser } from "../redux/actions/userAction";
import { Navigate } from "react-router-dom";
import { getAllProduct } from "../api/product";
import { loadAllproduct } from "../redux/actions/productAction";

const RequireDataAuth = (props) => {
	// console.log(props);
	// récupération d'un slug dans une const
	const params = useParams();
	const location = useLocation();
	//hook dispatch
	const dispatch = useDispatch();

	const Child = props.child;

	// hook redirect
	const [redirect, setRedirect] = useState(false);

	// on subscribe au store en récupérant les states qu'on a besoin
	const { userInfos, isLogged, productInfos, cartInfos, totalPrice } = useSelector((state) => ({
		...state.userReducer,
		...state.productReducer,
		...state.cartReducer,
		
	}));
	// chargement du composant
	useEffect(() => {
		 //console.log(props);
		// si les les produits  ne sont pas chargés dans redux, on les charge
		if(productInfos.length === 0){
			getAllProduct()
			
			.then(product =>{
				dispatch(loadAllproduct(product.results))
               // console.log(product.results)
			})
		}

		// si l'user n'est pas connecté (information récupéré du store)
		if (isLogged === false) {
			//console.log("isLogged === false");
			// on récupère le localStorage avec la clé rentré au login, on stocke dans une const TOKEN
			const TOKEN = localStorage.getItem("user_auth");
			//console.log(TOKEN);
			// si pas encore connecté, on vérifie le token
			if (TOKEN === null && props.auth) {
			//	console.log("TOKEN NULL && AUTH TRUE");
				setRedirect(true);
			} else {
				// appel de la fonction qui va requete ajax notre route checktoken en lui transmettant une variable
				checkToken(TOKEN).then((res)=>{
				//	console.log(res)
					// SI le status est différent de 200
					if (res.status !== 200) {
                       // console.log(res.status)
						// SI la route url d'un composant nécessite une authorisation
						// on redirige
						if (props.auth) {
							//console.log(props.auth)
							setRedirect(true);
						}
					} else {
						// sinon
						// ça veut dire qu'on récupère un utilisateur, on va donc le stocker dans une variable user
						let user = res.user[0];
						// on va lui définir sa propriété token avec ce qu'on a récupérer du localStorage
						user.token = TOKEN;
                      //  console.log(TOKEN)
						// envoi de la variable user dans le store
						dispatch(loadUser(user));
					}
				});
			}
		}
	}, [props]);
	//console.log(props)

	if (redirect) {
		return <Navigate to="/login" />;
	}

	return (
		<Child
			{...props}
	
			userInfos={userInfos}
			isLogged={isLogged}

			productInfos={productInfos}

			cartInfos={cartInfos}
			totalPrice={totalPrice}

			params={params}
			location={location}
		/>
	);
};

export default RequireDataAuth;
