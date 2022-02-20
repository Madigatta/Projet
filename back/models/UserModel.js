const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (_db) => {
	db = _db;
	return UserModel;
};

class UserModel {
	// méthode de récupération d'un utilisateur par son mail
	static getUserByMail(Email) {
		return db
			.query("SELECT * FROM users WHERE Email = ?", [Email])
			.then((res) => {
				console.log('MODEL',res);
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	// méthode d'enregistrement d'un utilisateur
	static saveOneUser(req) {
		//retourne cryptage du mot de passe
		return bcrypt.hash(req.body.Password, saltRounds).then((hash) => {
			//on retourne notre requète SQL
			return db
				.query(
					'INSERT INTO users (FirstName, LastName, Email, Password, Role, Address, City, Phone, CreationTimestamps, ConnexionTimestamp) VALUES (?, ?, ?, ?, "user", ?, ?, ?, NOW(), NOW())',
					[
						req.body.FirstName,
						req.body.LastName,
						req.body.Email,
						hash,
						req.body.Address,
						req.body.City,
						req.body.Phone,
					]
				)
				.then((response) => {
					console.log("respnse",response)
					return response;
				})
				.catch((err) => {
					return err;
				});
		});
	}

	// méthode de récupération d'un utilisateur par son id
	static getOneUser(id) {
		return db
			.query("SELECT * FROM users WHERE id= ?", [id])
			.then((user) => {
				if (user.length === 0) {
					return {
						status: 401,
						error: "email incorrect",
					};
				} else {
					return user;
				}
			});
	}

	
	static updateConnectionTimestamp(id) {
		console.log(id);
		//on retourne notre requète SQL
		return db
			.query("UPDATE users SET connexionTimestamp = NOW() WHERE id = ?", [id])
			.then((response) => {
				return response;
			})
			.catch((err) => {
				return err;
			});
	}
}
