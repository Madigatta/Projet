import React, { useState } from "react";
import Input from "../Form/Input";
import { config } from "../../config";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";


function DetailProduct(props) {
	const [quantity, setQuantity] = useState("");
	const [error, setError] = useState(null);
	const [isPopUp, setIsPopUp] = useState(false);
//	console.log(props);
	const dispatch = useDispatch()

	//au click ajout dans le panier
	const onClickAddCart1 = (product) => {
		//console.log(product);
		//console.log(quantity);
		if(quantity !== "" && !isNaN(quantity)) {
			 setIsPopUp( true)
			dispatch(addToCart(props.cartInfos, product, quantity))
		} else {
			setError({error: "Entrez un (chiffre)"})
		}
		setQuantity("")
	}

	const onClickAddCart2 = (product) => {
		console.log(product);
		if(quantity !== "" && !isNaN(quantity)) {
			setIsPopUp( true)
			dispatch(addToCart(props.cartInfos, product, quantity))
		} else {
			setError({error: "Entrez un (chiffre)"})
		}
		setQuantity("")
	}
	
	return (
		<>
			{error !== null && <p>{error}</p>}
			{/* {console.log(props)} */}
				{
					props.location.pathname === "/shop" ? <>
					{/* PAGE SHOP */}
					<Link to={`/DetailProductPage/${props.product.id}`}>
						<figure>
							<figcaption>{props.product.Name}</figcaption>
							<img src={config.img_url + props.product.Photo} alt="" />
							{/* {console.log(props.product.Photo)} */}
						</figure>
					</Link>
					<form>
						<Input type="number" value={quantity} onChange={e=> setQuantity(e.target.value)}/>
						<Input
							className="link-btn"
							type="button"
							value="Ajouter au panier"
							onClick={(e) => {
								e.preventDefault();
								onClickAddCart1(props.product)
							}}
							
						/>
					</form>
					</>
					: 
					// PAGE DETAIL DU PRODUIT
					<>
					<Link to={"/shop"}>Retour à la boutique</Link>
					<Link to={`${props.location.pathname}`}>
						<figure>
							<figcaption>{props.productInfos[props.product_index].Name}</figcaption>
							
							<img src={config.img_url + props.productInfos[props.product_index].Photo} alt="" />
						</figure>
						<p>{props.productInfos[props.product_index].Description}</p>
					</Link>
					<form>
						<Input type="number" value={quantity} onChange={e=> setQuantity(e.target.value)}/>
						<Input
							type="button"
							value="Ajouter au panier"
							onClick={(e) => {
								e.preventDefault();
								onClickAddCart2(props.productInfos[props.product_index])
							}}
						/>
					</form>
					</>
				}
		</>
	);
}

export default DetailProduct;
