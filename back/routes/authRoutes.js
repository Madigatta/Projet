const withAuth = require("../withAuth");

// routes pour  la gestion de la connexion par token
module.exports = function (app, db) {
	const userModel = require("../models/UserModel")(db);

	// test des tokens
	app.get("/api/v1/user/checkToken", withAuth, async (req, res, next) => {
		let user = await userModel.getOneUser(req.id);

		res.json({ status: 200, user: user });
	});
};