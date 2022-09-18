const { dataSource } = require("../tools/utils");
const express = require("express");
const service = require("../services/skillsServices");

const router = express.Router();

//GET /skills
router.get("/", async (request, response) => {
  const skills = await service.getAll();
  response.send(skills);
});

// POST /skills
// BODY {}
router.post("/", async (request, response) => {
  const skill = await service.create(request.body.name);
  console.log(skill);
  response.send(skill);
});

//Autre manière d'écrire
// router.post("/", async (req, res) => {
//   try {
//     const skillRequest = req.body;
//     const skillCreated = await service.create(skillRequest);
//     res.send(skillCreated);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

// Update a skill
router.put('/:id', async (request, response) => {
    try {
        const skill = await service.update(request.body.name, request.params.id);
        response.send(skill);
    } catch(e) {
        response.send(e.message);
    }
});

// DELETE /skill/6
router.delete("/:id", async (req, res) => {
  const skillId = req.params.id;
  await service.delete(skillId);
  res.sendStatus(204);
});

module.exports = router;