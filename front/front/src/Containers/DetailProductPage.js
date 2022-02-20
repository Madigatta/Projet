import React from "react";
import Card from "../Components/Card/Card";
import DetailProduct from "../Components/DetailProduct/DetailProduct";

function DetailProductPage(props) {
	console.log(props);
	const index = props.productInfos.findIndex((product) => product.id === parseInt(props.params.id));
	return (
		<Card>
			<DetailProduct product_index={index} {...props}/>
		</Card>
	);
}

export default DetailProductPage;
