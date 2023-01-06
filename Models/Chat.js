const mongoose = require("mongoose");

// ********* SCHEMA et MODEL*********

const chatSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	race: { type: String, required: true },
	age: { type: Number, required: true },
	proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	image_url: { type: String, required: true },
	sexe: { type: String, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);

// export par défaut
module.exports = Chat;
