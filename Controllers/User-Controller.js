const User = require("../Models/User");
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

	const { pseudo, email, password, chats } = req.body;

	const user = new User({ pseudo: pseudo, email: email, password: password, chats: chats });
	try {
		const resultat = await user.save();

		return res.status(201).json({ message: "user a été inséré avec succès", user: resultat });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la création du user" });
	}
};
const loginUser = async (req, res, next) => {
	//express validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email, password });
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "user non trouvé" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
	}
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
