const express = require("express");
const service = require("../services/wilderServices.js");

const router = express.Router();

// GET /wilders
router.get("/", async (req, res) => {
  const wilders = await service.getAll();
  res.send(wilders);
});

//GET / wilders
// router.get("/:id", async (req, res) => {
//   const wilder = await service.getOneById(req.params.id);
//   res.send(wilder);
// });

// POST /wilders
// BODY {}
router.post("/", async (req, res) => {
  try {
    const wilderRequest = req.body;
    const wilderCreated = await service.create(wilderRequest);
    res.send(wilderCreated);
  } catch (err) {
    res.send(err.message);
  }
});

// PUT /wilders/4
// BODY {}
router.put("/:id", async (req, res) => {
  const wilderId = req.params.id;
  const wilderRequest = req.body;
  const wilderUpdated = await service.update(wilderRequest, wilderId);
  res.send(wilderUpdated);
});

// DELETE /wilders/6
router.delete("/:id", async (req, res) => {
  const wilderId = req.params.id;
  await service.delete(wilderId);
  res.sendStatus(204);
});

router.post("/:id/skills/:skillId", async (req, res) => {
  try {
    const wilderId = req.params.id;
    const skillId = req.params.skillId;
    const wilder = await service.addSkill(skillId, wilderId);
    res.send(wilder);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
