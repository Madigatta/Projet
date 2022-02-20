import React, { useState } from "react";
import { Navigate  } from "react-router";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/user";

function Login() {
	// hooks pour mon formulaire
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

	const [redirect, setRedirect] = useState(false);

	// fonction pour la soumission du formulaire
	const submitHandler = (e) => {
		e.preventDefault();

		// création d'un objet data qui va recevoir les states de l'user
		const data = {
			Email: Email,
			Password: Password,
		};

		// appeler la fonction api AJAX de connexion user
		loginUser(data).then((res) => {
			console.log(res);
			// chainage, on vérifie le status de la réponse, si c'est validé, on place le token dans le localStorage
			if(res.status === 200){
			    localStorage.setItem("user_auth", res.token)
                setRedirect(true)
			}
		});
	};

	return (
		<main>
			{redirect && <Navigate to="/shop" />}
			<h2>Please login !</h2>

			<form onSubmit={submitHandler}>
				<label>Your email :</label>
				<input
					type="email"
					placeholder="Your email"

					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Your password :</label>
				<input
					type="password"
					placeholder="Your password"

					onChange={(e) => setPassword(e.target.value)}
				/>


				<input type="submit" value="Send" />

                <Link to={"/register"}>Sinon enregistrez-vous !!</Link>
			</form>
		</main>
	);
}

export default Login;
