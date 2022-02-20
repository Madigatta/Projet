import React from "react";
import CheckoutForm from "../Components/Form/Checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";

// page de paiement
function Payment(props) {
	console.log("PAYMENT", props);

	const InjectedCheckoutForm = () => {
		// chargement du formulaire de carte bleue
		return (
			<ElementsConsumer>
				{({ stripe, elements }) => (
					<CheckoutForm
						OrderId={props.params.orderId}
						stripe={stripe}
						elements={elements}
						{...props}
					/>
				)}
			</ElementsConsumer>
		);
	};

	const stripePromise = loadStripe(
		"pk_test_51K1sg2GyWCAfABlO5nTF9idau49tyTXed2GTmp3QfR9QxBT9TFPBjoancVgCiXefUcYSTBMzh1Pqcdlpprcau17P00t0TFd5GS"
	);

	return (
		<div>
			<h2>Paiement</h2>
			<Elements stripe={stripePromise}>{InjectedCheckoutForm()}</Elements>
		</div>
	);
}

export default Payment;
