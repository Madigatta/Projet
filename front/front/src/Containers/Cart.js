import React, { useState } from "react";
import { deleteCart } from "../redux/actions/cartAction";
import { config } from "../config";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Cart(props) {
	console.log(props)
	
	const [redirect, setRedirect] = useState(false);
	const [OrderId, setOrderId] = useState(null);
	const dispatch = useDispatch();

	// chargement des produits dans le panier
	const listBasket = () => {
	//	console.log(listBasket)
		return props.cartInfos.map((product) => {
			let Total = parseInt(product.Price) * parseInt(product.quantityInCart);
			return (
				<tr key={product.id}>
					<td>{product.Name}</td>
					<td>{product.quantityInCart}</td>
					<td>{product.Price}</td>
					<td>{Total}</td>
					<td>
						<button
							className="delete-product"
							
							onClick={() => {
								dispatch(deleteCart(props.cartInfos, product));
							}}
						>
							<i className="fa fa-trash"></i>
							delete
						</button>
					</td>
				</tr>
			);
		});
	};

	// au click on enregistre une commande
	const onClickSaveOrder = () => {
		console.log(onClickSaveOrder)
		if (props.isLogged === true) {
			let data = {
				user_id: props.userInfos.id,
				cart: props.cartInfos,
			};
			// post  api
			axios
				.post(config.api_url + "/api/v1/order/save", data, {
					headers: { "x-access-token": props.userInfos.token },
				})
				.then((res) => {
					console.log("result axios",res);
					setOrderId(res.data.orderId);
					setRedirect(true);
				});
		}
	};
	return (
		<main id="displayBasket">
			{console.log(OrderId)}
			{redirect && <Navigate to={"/payment/" + OrderId} />}
			<h2>Panier</h2>
			{props.cartInfos.length > 0 ? (
				<table className="basketTable">
					<thead>
						<tr>
							<th>Name</th>
							<th>Quantity</th>
							<th className="desktop">Price</th>
							<th>Total price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<td>Total price</td>
							<td></td>
							<td className="desktop"></td>
							<td>
								<span id="totalPrice">{props.TotalPrice}</span>{" "}€
								
							</td>
							<td></td>
						</tr>
					</tfoot>
					{props.cartInfos.length > 0 && (
						<tbody>{listBasket()}</tbody>
					)}
				</table>
			) : (
				<>
					<p>Le panier est vide...</p>
					<Link to={"/shop"} className="link-btn">Dépenser de l'argent</Link>
				</>
			)}
			{props.cartInfos.length > 0 && (
				<button
					onClick={(e) => {
						onClickSaveOrder();
					}}
				>
					Payer
				</button>
			)}
		</main>
	);
}

export default Cart;
