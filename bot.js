//
// This is main file containing code implementing the Express server and functionality for the Express echo bot.
//
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request-promise");

const fs = require("fs");

const path = require("path");

const querystring = require("querystring");

/*
const WordConfig = JSON.parse(
  fs.readFileSync("./config/wordList.json")
);
*/
var wordConfig = fs.readFileSync("./config/wordList.csv", "utf-8");
var words = wordConfig.split("\n");
console.log(wordConfig.length);

var word = words[Math.floor(Math.random()*words.length)];


let app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("static"));

app.post("/checkSpelling", function(req, res) {
    
  var checkSpellingResult = {};
  
  console.log(req.body.wordToCheck + "::" + req.body.spellingEntered);
  if (req.body.wordToCheck == req.body.spellingEntered)
    {
      checkSpellingResult["checkResult"] = "Awesome";
    }
  else
    {
      var correctSpellingLetters = req.body.wordToCheck.split('');
      var correctSpellingMessage = '';
      correctSpellingLetters.forEach(function(letter){
        correctSpellingMessage += letter + ' ';
      });
      console.log(correctSpellingMessage);
      checkSpellingResult["checkResult"] = "Sorry, " + req.body.wordToCheck + " is spelled " + correctSpellingMessage;
    }
  checkSpellingResult["newWord"] = words[Math.floor(Math.random()*words.length)];;
  console.log(checkSpellingResult);
  res.json(JSON.stringify({response: checkSpellingResult}));
});

/* ------------------------
----------------------------
Start Node Server
-------------------------------
*/

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port %s", server.address().port);
});
