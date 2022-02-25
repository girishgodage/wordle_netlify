const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios").default;
const cors = require("cors");
require("dotenv").config();

const app = express();
const router = express.Router();

app.use(cors());

router.get("/word", (req, res) => {
  console.log(process.env.RAPID_API_KEY);
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5", wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.get("/check", (req, res) => {
  const queyword = req.query.word;

  const options = {
    method: "GET",
    url: "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary",
    //url: "https://twinword-word-graph-dictionary.p.rapidapi.com/association/",
    params: { word: queyword },
    headers: {
      //"x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      "x-rapidapi-host": "dictionary-by-api-ninjas.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      //RAPID_API_KEY=437713b7c7msh0e7143024293bfdp1dd425jsn6f0d45732e26
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data.valid);
      res.json(response.data.valid);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
