import React from "react";
import product from '../assets/logo/jaaba.jpg';

function Home(props) {
	console.log(props);
	return (
		<main>
			<h1>Bienvenue sur les produits locaux</h1>
			<p id="presentation">Le site d'AJM(Association des Jeunes de Marenkhafo) pour la vente de produits locaux ici vous trouverez les meilleurs 
			produits alimentaires, et artisanaux.</p>
			<img src={product} id="Home" alt=""/>
		</main>
	);
}

export default Home;
