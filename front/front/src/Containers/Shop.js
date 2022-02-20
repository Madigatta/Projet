import React from "react";

import Card from "../Components/Card/Card";
import DetailProduct from "../Components/DetailProduct/DetailProduct";

function Shop(props) {
    console.log(props)

	return (
		<main>
			<h2>Bienvenue à la E-boutique !!!</h2>
			

			{props.productInfos.length > 0 &&
				props.productInfos.map((product) => {
					return (
						<Card key={product.id}>
							<DetailProduct product={product} {...props}/>
						</Card>
					);
				})}
		</main>
	);
}

export default Shop;
