const express = require("express");
const router = express.Router();
const tutorialService = require("../services/tutorialService");
const { getLastIdFromJsonFile } = require("../utils");

router.get("/tutorial", async (req, res) => {
  try {
    const { searchText } = req.query;
    const tutorial = await tutorialService.searchTutorials(searchText);
    res.json(tutorial);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.post("/tutorial", async (req, res) => {
  try {
    const { id, title, description, author, comments } = req.body;

    const newtutorial = {
      id: id,
      title,
      description,
      author,
      comments,
    };

    await tutorialService.addTutorial(newtutorial);

    res.json({ success: true, message: "tutorial added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.delete("/tutorial", async (req, res) => {
  try {
    const { title } = req.body;
    await tutorialService.deleteTutorial(title);
    res.json({ success: true, message: "Tutorial deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});



module.exports = router;
