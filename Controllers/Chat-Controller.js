const Chat = require("./../models/Chat");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");

/**recuperer la liste les chats d'un utilisateur */
const getCats = async (req, res, next) => {
	// 200 : succes
	// 404 : non trouvé
	// 500 erreur du serveur (DB , api)
	const {
		params: { id },
	} = req;

	try {
		const user = await User.findById(id);
		var cat;
		var tab = [];
		if (user.chats.length !== 0) {
			for (let index = 0; index < user.chats.length; index++) {
				cat = await Chat.findById(user.chats[index].toString());
				tab.push(cat);
			}
			return res.status(200).json({ user: user.pseudo, chats: tab });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération des données" });
	}

	res.status(404).json({ message: "Chats non trouvés" });
};

const createCat = async (req, res, next) => {
	const { nom, race, age, proprietaire, image_url, sexe } = req.body;
	//express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const user = await User.findById(proprietaire.toString());
	if (user) {
		const chat = new Chat({ nom: nom, race: race, age: age, proprietaire: proprietaire, image_url: image_url, sexe: sexe });
		try {
			user.chats.push(chat);
			await user.save();
			const resultat = await chat.save();

			return res.status(201).json({ message: "chat a été inséré avec succès", chat: resultat });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erreur lors de la création du chat" });
		}
	}
};

const getCatById = async (req, res, next) => {
	// ES6
	const {
		params: { id },
	} = req;
	try {
		const chat = await Chat.findById(id);
		if (chat) {
			return res.status(200).json(chat);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération du chat" });
	}

	res.status(404).json({ message: "chat non trouvè avec l'id fournie" });
};

const updateCat = async (req, res, next) => {
	// 1- récupération de l'id et les données envoyées par le client
	const {
		params: { id },
	} = req;
	const {
		body: { nom, race, age, image_url, sexe },
	} = req;

	try {
		// 2- récupération du chat depuis la bdd
		const chat = await Chat.findById(id);
		if (chat) {
			chat.nom = nom;
			chat.race = race;
			chat.image_url = image_url;
			chat.sexe = sexe;
			chat.age = age;
			await chat.save();
			return res.status(200).json({ message: "chat a été mit à jour avec succès", chat: chat });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour du chat" });
	}

	return res.status(404).json({ message: "chat non trouvé" });
};

const deleteCat = async (req, res, next) => {
	const {
		params: { id },
	} = req;
	try {
		const chat = await Chat.findById(id);
		if (chat) {
			await chat.delete();
			return res.status(200).json({ message: "chat a été supprimé avec succès" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour du chat" });
	}
	return res.status(404).json({ message: "chat non trouvé" });
};

// export multiple
exports.getCats = getCats;
exports.createCat = createCat;
exports.getCatById = getCatById;
exports.updateCat = updateCat;
exports.deleteCat = deleteCat;
