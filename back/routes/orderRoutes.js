const stripe = require("stripe")('sk_test_51K1sZfG1rM65gYq9C1JJDwtMBiCHff7I0d9BihPYjQhNBq3s4ecBYyJayMfRdQ8wkRqWFUU5xB932PcR0XC9EK7900J1G0JTIQ');
const withAuth = require("../withAuth");

module.exports = function (app, db) {
    const orderModel = require('../models/OrderModel')(db);
    const ProductModel = require('../models/ProductModel')(db);

    //sauvegarde une commande
    app.post("/api/v1/order/save", withAuth, async (req, res, next) => {
        console.log("REQBODY",req.body);
        //creation d'une variable totalAmount
        let totalAmount = 0;
        // appel de la méthode d'enregistrement d'une order
        await orderModel.saveOneOrder(req.body.user_id, totalAmount)
        .then(async (res1)=>{
            console.log("RESULT",res1)
            //récupèrer le dernier id généré dans notre bdd
            let id = res1.insertId
            // enregistrement des orderdetails cart contient tous les produits commandés avec une boucle map en async
                req.body.cart.map(async(product)=>{
                //chaque tour de boucle correspond à un produit
                //on appelle la méthode pour récupérer les infos du produit par rapport à son id balancé depuis le front
                await ProductModel.getOneProduct(product.id)
                .then(async (res2) => {
                    console.log(res2)
                    //on enregistre le prix à l'unité du produit qu'on attribut au produit du cart
                    product.safePrice = parseFloat(res2[0].price);
                    //on appelle la méthode pour insérer ce produit
                    await orderModel.saveOneOrderDetail(id)
                    .then(async (res3)=>{
                        //ajout du prix du produit par sa quantité au montant total de la commande
                        totalAmount += parseInt(product.quantityInCart) * parseFloat(product.safePrice)
                        //on fait la mise à jour de notre commande avec l' appelle la méthode 
                        await orderModel.updateTotalAmount(id, totalAmount)
                    })
                })
            })
            // // on envoi une réponse json status 200
            res.json({status: 200, orderId: id, msg: "Commande validée !!!"})
        })
    })

  
    // gestion du paiement
	app.post("/api/v1/order/payment", withAuth, async (req, res, next) => {
      // let id = req.params.id
		let order = await orderModel.getOneOrder(req.body.OrderId);
        console.log("ORDER", order)
		const paymentIntent = await stripe.paymentIntents.create({
            amount: order[0].totalAmount*100,
            currency: 'eur',
            metadata: {integration_check: 'accept_a_payment'},
            receipt_email: req.body.email,
        });
        console.log("PAYEMENTINTENT",paymentIntent)

		//stripes va renvoyer paiement accepté ou refusé
		res.json({ client_secret: paymentIntent["client_secret"] });
	});

	// validation du paiement dans un order
	app.put('/api/v1/order/validate', withAuth, async (req, res, next)=>{
        //mise à jour du status du paiement de la commande
        let validate = await orderModel.updateStatus(req.body.orderId, req.body.status)
        if(validate.code){
            res.json({status: 500, msg: validate})
        }
        //rep json positive si le payement est validée
        res.json({status: 200, msg: "paiement validé"})
    })
    

}


