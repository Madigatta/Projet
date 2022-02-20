const jwt = require("jsonwebtoken");
const secret = "çaroxxdev";

const withAuth = (req, res, next) => {
	//on récupère notre token dans le header de la requète HTTP (toujours crypté)
	const token = req.headers["x-access-token"];
	//si il ne le trouve pas
if(token === undefined || token.includes('null')) {
		//renvoi d'une erreur
		res.json({
			 status: 404,
			 msg: "token not found",
			token: token,
		});
	} else {
		//sinon (trouvé) utilisation de la fonction de vérification de jsonwebtoken.
		jwt.verify(token, secret, (err, decoded) => {
			//si il y'a une erreur envoi d'une rep d'erreur
			if (err) {
				res.json({
					status: 401,
					msg: "error, votre token est invalide",
					token: token
				});
			} else {
				//sinon envoi de l'id décodé dans le payload du token
				req.id = decoded.id;
				//on sort de la fonction
				next();
			}
		});
	}
};

module.exports = withAuth;
