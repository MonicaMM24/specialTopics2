require("dotenv").config();

const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "muq90JlsBjstWkAgjsZa",
  },
});

module.exports = client;
