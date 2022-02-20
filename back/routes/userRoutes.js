const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const withAuth = require("../withAuth");
const secret = "çaroxxdev";

module.exports = (app, db) => {
	// import de notre module UserModel
	const userModel = require("../models/UserModel")(db);

	// route d'enregistrement un utilisateur  via le mail
	app.post("/api/v1/user/save",async (req, res) => {
		// appel de la méthode qui récupère le mail et vérifier si le mail existe déjà
		await userModel.getUserByMail(req.body.Email)
        .then(async (res1) => {
			if (res1.length > 0) {
				return res.json({ status: 401, msg: "Email existe déjà" });
			}
			// appel de la méthode d'insertion d'un utilisateur
			await userModel.saveOneUser(req).then((res2) => {
				if (res2.code) {
					// vérifier s'il y a des erreurs
					res.json({ status: 500, msg: res2.message });
				}
				// sinon status 200
				res.json({ status: 200, msg: "Bienvenue chez nous !!" });
			});
		});
	});

	// route de gestion de la connexion d'un utilisateur
    app.post('/api/v1/user/login', async(req, res)=>{
        // appel de la fonction de récupération par mail
        await userModel.getUserByMail(req.body.Email)
        // si ça renvoi 0, pas d'utilisateur à ce mail
        .then(user=>{
            if(user.length === 0){
                return res.json({status: 404, msg: "Pas d'utilisateur avec ce mail !"})
            }
            // comparaison des mots de passes
            bcrypt.compare(req.body.Password, user[0].Password)
            .then(same=>{
                // si c'est bon(true)
                if(same){
                    // création d'un const payload avec nos infos (email et id dans un objet)
                    const payload = {Email: req.body.Email, id: user[0].id}
                    // création d'une const token qui va créé le token avec la fonction sign de jwt
                    const token = jwt.sign(payload, secret)
                    //on envoi un status 200 avec le token et l'id utilisateur
                        
                        res.json({status: 200, token: token, user_id: user[0].id, msg: "Vous êtes bien authentifié !"})
                   

                } else {
                    //sinon on renvoi une erreur status 401 et mot de passe incorrect
                    res.json({status: 401, msg: "Votre mot de passe est incorrecte"})
                }
                
            })
            
        })
    })

    app.patch(`/api/v1/user/updateConnectionTimestamp/:id`, async (req,res)=>{
        await userModel.updateConnectionTimestamp(req.params.id)
        .then(res1=>{
            res.json({ status: 200, results: res1 });
        })
    })
        


    
};
