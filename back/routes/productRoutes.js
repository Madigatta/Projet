const fs = require("fs");
const withAuth = require("../withAuth");


module.exports = (app, db) => {
	const productModel = require ("../models/ProductModel")(db);
	
	
	app.get("/api/v1/product/all", async (req, res) => {
		await productModel.getAllProduct()
		.then((resReqSql) => {
			if (resReqSql.code) {
				res.json({ status: 500, error: resReqSql.message });
			}
			res.json({ status: 200, results: resReqSql });
		});
	});


	//route permettant de récupérer un produit
	app.get("/api/v1/product/one/:id", withAuth, async (req, res) => {
		await productModel.getOneProduct(req).then((resReqSql) => {
			if (resReqSql.code) {
				res.json({ status: 500, error: resReqSql.message });
			}
			res.json({ status: 200, results: resReqSql });
		});
	});

// route permettant d'insérer un produit
app.put("/api/v1/product/add", withAuth, async (req, res) => {
	await productModel.addOneProduct(req).then((resSql) => {
		if (resSql.code) {
			res.json({ status: 500, error: resSql.message });
		}
		res.json({ status: 200, msg: "Produit bien ajoutée !!" });
	});
});


// route permettant d'insérer la photo d'un produit
app.post("/api/v1/product/addPhoto", async (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		res.json({
			status: 400,
			msg: "la photo n'a pas pu être récupérée",
		});
	}

	req.files.image.mv(`public/images/${req.files.image.name}`, (err) => {
		console.log(" c'est bon");
		if (err) {
			res.json({
				status: 500,
				msg: "La photo n'a pas pu être enregistrée !",
			});
		}
	});

	res.json({
		status: 200,
		msg: " Photo bien enregistrée",
		url: req.files.image.name,
	});
});
/************************************************************************** */
// route permettant de modifier un produit
app.patch("/api/v1/product/update/:id",async (req, res) => {
	await productModel.updateOneProduct(req).then((resReqSql) => {
		if (resReqSql.code) {
			res.json({ status: 500, error: resReqSql.message });
		}
		res.json({ status: 200, msg: "Product bien modifiée" });
	});
});

/******************************************************************* */

// route permettant de supprimer un produit
app.delete("/api/v1/product/delete/:id", async (req, res) => {
	let id = req.params.id;
	await productModel.getOneProduct(req)
	.then(async(res1) => {
		// console.log(res1[0].photo);
		await productModel.deleteOneProduct(id)
		.then((res2) => {
			if (res2.code) {
				res.json({ status: 500, error: res2.message });
			}
			// suppression des photos (si l'annonce est bien supprimée)
			if (res1[0].photo !== "no-pict.jpg") {
				fs.unlink(`public/images/${res1[0].photo}`, (err) => {
					if (err) {
						res.json({ status: 500, error: err });
					}
					console.log("ça supprime");
				});
			}
		});
	});
	res.json({ status: 200, msg: "Produt bien supprimée !" });
});















	
};
