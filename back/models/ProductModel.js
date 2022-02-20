// REQUETES SQL
module.exports = (_db) => {
	db = _db;
	return ProductModel;
};

class ProductModel {
		//récupération de toutes les produits

	static getAllProduct() {
		return db
			.query("SELECT * FROM product")
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			});
	}


//récupération d'une produits par son id
	static getOneProduct(id) {
		//console.log(req)
	//let id = req.params.id;
	//console.log(id)
	return db
		.query("SELECT * FROM product WHERE id = ?", [id])
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
}

// insertion d'une produit
static addOneProduct(req) {
	return db
		.query(
			"INSERT INTO product (Name, description, price, photo, quantity, creationTimestamp) VALUES( ?, ?, ?, ?, ?, NOW())",
			[
				req.body.Name,
				req.body.Description,
				req.body.Price,
				req.body.Photo,
				req.body.Quantity,
			]
		)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
}

//modification d'une produits
static updateOneProduct(req) {
	let id = req.params.id;
	return db
		.query(
			"UPDATE product SET Name = ?, Description = ?, Price = ?, Photo = ?, Quantity = ? WHERE id = ? ",
			[
				req.body.Name,
				req.body.Description,
				req.body.Price,
				req.body.Photo,
				req.body.Quantity,
				id,
			]
		)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
}

// suppression d'un produt
static deleteOneProduct(id) {
	return db
		.query("DELETE FROM product WHERE id = ?", [id])
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
}








	
}
