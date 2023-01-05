const mongoose = require("mongoose");
// ********* SCHEMA et MODEL*********

const userSchema = new mongoose.Schema({
	pseudo: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	//chats
});

const User = mongoose.model("User", userSchema);

// export par défaut
module.exports = User;
