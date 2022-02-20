module.exports = (_db) => {
	db = _db
	return OrderModel
}

class OrderModel {

    static saveOneOrder(user_id, totalAmount) {
        //requète d'insertion d'une commande dans la table orders
        return db.query('INSERT INTO orders (user_id, TotalAmount, CreationTimestamps, status) VALUES (?,?, NOW(),"not payed")', [user_id, totalAmount])
        .then((result)=>{
    		//console.log("RESULT",result)
			return result;
		})
		.catch((err)=>{
			//console.log("ERREUR",err)
				return err;
		})
    }


    // insertion d'un produit dans orderdetail
    static saveOneOrderDetail(Order_id, ) {
        //calcul du total 
        let total = parseInt(product.quantityInCart) * parseFloat(product.safePrice)
        return db.query('INSERT INTO orderdetails (order_id, product_id, quantity, total) VALUES (?, ?, ? ,?)', [Order_id, Product.id, product.quantityInCart, total])
    		.then((res)=>{
        		console.log("RESULT",res)
    			return result;
    		})
    		.catch((err)=>{
    			console.log("err",err)
    				return err;
    		})
    }

    // mise à jour d'un montant total
    static updateTotalAmount(Order_id, TotalAmount) {
        //requète de mise à jour de la table orders
        return db.query('UPDATE orders SET totalAmount = ? WHERE id=?', [TotalAmount, Order_id])
        .then((result)=>{
            console.log(result)
            return result;
        })
        .catch((err)=>{
            console.log("err",err)
                return err;
        })
    }

    // récupération d'une commande en fonction d'un id
    static getOneOrder(id) {
        return db.query('SELECT * FROM orders WHERE id =?', [id])
            .then((result)=>{
        		console.log("result",result)
    			return result;
    		})
    		.catch((err)=>{
    			console.log("err",err)
    				return err;
    		})
    }
    
    // modification du status d'une commande
    static updateStatus(OrderId, Status){
        //requète de récupération dans la table orders
        return db.query('UPDATE orders SET status =? WHERE id =?', [Status, OrderId])
			.then((result)=>{
				console.log(result);
				return result;
			})
			.catch((err)=>{
				console.log("err",err)
				return err;
			})
    }

}