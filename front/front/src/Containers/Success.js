import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { cleanCart } from "../redux/actions/cartAction";

//Page de succès de la commande
function Success() {
	console.log(Success)
	useEffect(() => {
		window.localStorage.removeItem("cart");
		cleanCart();
	}, []);

	return (
		<div>
			<p>La commande a été effectué avec succès</p>
			<Link to="/">Retour</Link>
		</div>
	);
}

export default Success;
