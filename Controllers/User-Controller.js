const User = require("../Models/User");
var jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const getUsers = async (req, res, next) => {
	// 200 : succes
	// 404 : non trouvé
	// 500 erreur du serveur (DB , api)
	try {
		const users = await User.find();
		if (users.length !== 0) {
			return res.status(200).json({ users: users });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération des données" });
	}

	res.status(404).json({ message: "Users non trouvés" });
};

const createUser = async (req, res, next) => {
	//express validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { pseudo, email, password } = req.body;

	const user = new User({ pseudo: pseudo, email: email, password: password });
	try {
		const resultat = await user.save();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la création du user" });
	}
	// ************CREATION DU JETON***********
	let token;
	try {
		token = jwt.sign({ userId: user.id, email: user.email }, "le_secret_de_wiskas");
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la création du compte, veuillez réessayer plus tard!" });
	}
	// ***********envoyer une réponse********************
	res.status(201).json({ message: "compte crée", token: token });
};
const loginUser = async (req, res, next) => {
	//express validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;
	let user;
	try {
		user = await User.findOne({ email });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la connexion au compte, veuillez réessayer plus tard!" });
	}
	if (!user) {
		return res.status(404).json({ message: "utilisateur non trouvé avec l'email fournie" });
	}
	// ********* Vérifier si le mot de passe est bon *********
	let isValid = false;
	try {
		isValid = await bcryptjs.compare(password, user.password);
	} catch (error) {
		return res.status(500).json({ message: "Erreur lors de la connexion au compte, veuillez réessayer plus tard!" });
	}
	if (!isValid) {
		// mot de passe est invalide
		return res.status(401).json({ message: "Erreur lors de la connexion au compte, mot de passe est incorrecte" });
	}
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
