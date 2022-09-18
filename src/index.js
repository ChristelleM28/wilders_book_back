const express = require("express");
const cors = require("cors");
const { dataSource } = require("./tools/utils");
const wilderController = require("./controllers/wilderController");
const skillsController = require("./controllers/skillsController");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

//je définis la route principale de mon api qui sera suivie par la requête du controller
app.use("/api/wilders", wilderController);
app.use("/api/skills", skillsController);

//Start Server
  app.listen(5001, async () => {
    await dataSource.initialize();
    console.log("server started on port 5001");
});

