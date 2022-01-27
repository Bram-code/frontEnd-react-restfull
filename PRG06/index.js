const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost')

console.log("Starting...")

//package koppelen voor de web server
const express = require('express')

//maak beschikbaar via app
const app = express()

app.use(express.json());
app.use(express.urlencoded());

//voeg entry toe voor url /
app.get('/', function(req, res){

    res.header("Content-Type", "application/json")
    res.send("{ \"message\": \"Hello there\" }")

});

let gamesRouter = require("./routes/gamesRouter")();

app.use("/api", gamesRouter);

//start web applicatie
//standaard poort 80, 8000 is betefr
app.listen(8000)
