const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");

// Elasticsearch client
const createTutorialIndex = require("./config/elasticSearchTutorialIndex");
createTutorialIndex();

// CORS
app.use(cors());

// Middlewares
app.use(bodyParser.json());

// Routes
const tutorialRoutes = require("./routes/tutorials");
app.use("/api", tutorialRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
