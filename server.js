const express = require("express");
const app = express();
const URL = require("./database");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const routerCats = require("./Routes/Chat-Routes");
const routerUser = require("./Routes/User-Routes");

app.use(bodyparser.json());

app.use("/api/users", routerUser);
app.use("/api/cats", routerCats);

mongoose
	.connect(URL)
	.then(() => {
		console.log("connexion etablie");
		const port = 5000;
		app.listen(port, () => {
			console.log("serveur ecoute");
		});
	})
	.catch((error) => {
		console.log("connexion echoué");
		console.log(error);
	});
