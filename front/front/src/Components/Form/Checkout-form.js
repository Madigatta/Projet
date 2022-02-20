import React, { useState } from "react";
import { CardElement,} from "@stripe/react-stripe-js";
import axios from "axios";
import { config } from "../../config";
import { Navigate } from "react-router-dom";

// formulaire  bancaire
function CheckoutForm(props) {
	console.log("CheckoutForm", props);
	const [redirect, setRedirect] = useState(false);
	// const stripe = useStripe();
	// const elements = useElements();
	//let id = props.params.id

	// lors de l'envoie du formulaire
	const handleSubmit = async (e) => {
		//console.log(handleSubmit)
		e.preventDefault();
// 
		let data = {
			email: props.userInfos.Email,
			OrderId: props.OrderId,
		};
		console.log(data)

		//gestion du paiement via stripe
		const paymentAuth = await axios.post(
			config.api_url + "/api/v1/order/payment", data,
			
			{ headers: { "x-access-token": props.userInfos.token } }
		);

		console.log("PAYEMENTAUTH",paymentAuth);
		const secret = paymentAuth.data.client_secret;
		const payment = await props.stripe.confirmCardPayment(secret, {
			
			payment_method: {
				card: props.elements.getElement(CardElement),
				billing_details: {
					email: props.userInfos.email,
				},
			},
		});

		// gestion en cas d'erreur
		if (payment.error) {
			console.log(payment.error.message);
		} else {
			// si le paiement est un succes
			if (payment.paymentIntent.status === "paiement réusi") {
				let data = {
					OrderId: props.OrderId,
					Status: "payed",
				};
				// on enregistre en bdd le status
				axios
					.put(config.api_url + "/api/v1/order/validate", data, {
						headers: { "x-access-token": props.userInfos.token },
					})
					.then((res) => {
						console.log(res);
						setRedirect(true);
					});
			}
		}
	 };

	const  {stripe} = props
	//
	return (
		<>
			{redirect && <Navigate to="/success" />}
			<form onSubmit={handleSubmit}>
 
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button type="submit" disabled={!stripe}>
					Pay
				</button>
			</form>
		</>
	);
}

export default CheckoutForm;
