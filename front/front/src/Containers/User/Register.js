import React, { useState } from "react";
import { registerUser } from "../../api/user";
import { Navigate } from "react-router";

import style from './User.module.css'

function Register() {
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [Address, setAddress] = useState("");

	const [City, setCity] = useState("");
	const [Phone, setPhone] = useState();

	const [error, setError] = useState(null);

	const [redirect, setRedirect] = useState(false);

	const onSubmitForm = () => {
		//console.log(onSubmitForm)
		if (Password.length < 5) {
			return setError("Mot de passe trop court ! 5 lettres minimum")
			
		}

		let data = {
			FirstName: FirstName,
			LastName: LastName,
			Email: Email,
			Password: Password,
			Address: Address,
			City: City,
			Phone: Phone,
		};

		registerUser(data)
		.then((res) => {
		  console.log("Je viens d'entregistrer un utilisateur", res);
		  if (res.status === 200) {
			setRedirect(true);
		  } 
		  
		})
		.catch((err) => {
		  return err;
		});
	};


	return (
		<>
			{redirect && <Navigate to="/login" />}
			<main role="main" className="register">
				<h2>Ici vous pouvez vous enregistrez !!</h2>
				<form id = "register"
					onSubmit={(e) => {
         	console.log(e)
						e.preventDefault();
						onSubmitForm();
					}}
				>
					<label htmlFor="FirstName">FirstName :</label>
					<input
						type="text"
						 placeholder="Your firstName"
						name="FirstName"
						onChange={(e) => {
							setFirstName(e.currentTarget.value);
						}}
					/>

					<label htmlFor="LastName">LastName :</label>
					<input
						type="text"
						placeholder="Your lastName"

						name="LastName"
						onChange={(e) => {
							setLastName(e.currentTarget.value);
						}}
					/>

					<label htmlFor="Email">Email :</label>
					<input
						type="Email"
						placeholder="Your email"

						name="Email"
						onChange={(e) => {
							setEmail(e.currentTarget.value);
						}}
					/>
					{error !== null && <p className={style.alert}>{error}</p>}
					<label htmlFor="Password">Password :</label>
					<input
						type="Password"
						placeholder="Your password"

						name="Password"
						onChange={(e) => {
							setPassword(e.currentTarget.value);
						}}
					/>

					<label htmlFor="Address">Address :</label>
					<input
						type="Address"
						placeholder="Your address"

						name="Address"
						onChange={(e) => {
							setAddress(e.currentTarget.value);
						}}
					/>

					<label htmlFor="City">City :</label>
					<input
						type="text"
						placeholder="Your city"

						name="City"
						onChange={(e) => {
							setCity(e.currentTarget.value);
						}}
					/>

					<label htmlFor="Phone">Phone :</label>
					<input
						type="number"
						placeholder="Your phone"

						name="Phone"
						onChange={(e) => {
							setPhone(e.currentTarget.value);
						}}
					/>

					<input type="submit" value="Send" className={style.btn}/>
				</form>
			</main>
		</>
	);
}

export default Register;
