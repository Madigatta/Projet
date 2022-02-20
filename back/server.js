const express = require("express");
const mysql = require("promise-mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

require("dotenv").config();

if (!process.env.HOST_DB) {
var config = require("./config-local");
}
// else {
// 	var config = require("./config-online");
// }

app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// importation de mes routes
const authRoutes = require("./routes/authRoutes")
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// connexion BDD
const HOST = process.env.HOST_DB || config.db.host;
const DATABASE = process.env.DATABASE || config.db.database;
const USER = process.env.USER || config.db.user;
const PASSWORD = process.env.PASSWORD || config.db.password;
//
const PORT = process.env.PORT || 8000;

mysql
	.createConnection({
		host: HOST,
		database: DATABASE,
		user: USER,
		password: PASSWORD,
	})
	.then((db) => {
		console.log(`Bien connecté à : ${db.config.database}`);
		setInterval(async () => {
			let res = await db.query("SELECT 1");
		}, 10000);

		app.get("/", (req, res) => {
			res.json({
				status: 200,
				msg: "Bienvenue dans ma E-Shop Local_product API !!!",
				DB: db.config.host,
			});
		});

		// appel de mes routes
		authRoutes(app, db);
		productRoutes(app, db);
		orderRoutes(app, db);
		userRoutes(app, db);
	})

	.catch((err) => {
		console.log(`Pas connecté :'( -> ${err}`);
	});

app.listen(PORT, () => {
	console.log(`Listening on port ---> ${PORT} `);
});
