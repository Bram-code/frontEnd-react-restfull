const express = require("express");



let Game = require("../models/gameModel");

let router = () => {
    let gamesRouter = express.Router();

    gamesRouter.use('/games/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.header("Accept", "application/json, application/x-www-form-urlencoded");
        next(); 
    })

    gamesRouter.use('/games/', function (req, res, next) {

        if (req.method == 'OPTIONS' || req.headers.accept == "application/json"){
            next()
        }else{
            res.status(400).send()
        }
    })
    
    gamesRouter.route('/games')
    
    .get(function (req, res){
        Game.find({}, function (err, games) {
            if (err) {
                res.status(500).send(err);
            }
            else
            {
                let gamesCollection = {
                    "items" : [],
                    "_links" : {
                        "self" : {"href" : "http://" + req.headers.host + "/api/games"},
                        "collection" : {"href" : "http://" + req.headers.host + "/api/games"}
                    },
                    "pagination" : {"message" : "sorry maar dit wordt hem niet meer..."}
                }

                for (let game of games) {
                    console.log(game)
                    let gameItem = game.toJSON()

                    gameItem._links = {
                        "self" : {"href" :  "http://" + req.headers.host + "/api/games/" + gameItem._id},
                        "collection" : {"href" : "http://" + req.headers.host + "/api/games"}
                    }



                    gamesCollection.items.push(gameItem)
                }

                res.json(gamesCollection);
            }
        })
    })

    .post( function (req,res) {

        console.log (res)
        if (!req.is('application/json', 'application/x-www-form-urlencoded')) {
            res.status(406).send("406 - Not Acceptable");
        }
        else

        {
            console.log(req.body)
            let game = new Game(req.body); 

            game.save(function (err) {
                if (err) { 
                    res.status(400).send(err) 
                }
                else 
                { 
                    res.status(201).json(game) 
                }
            });
        }
    })
    
    .options( function (req, res){
        res.header("Allow", "POST,GET,OPTIONS")
        res.send()
    })

    
gamesRouter.route('/games/:gameId')
// GET request
.get(async(req, res ) => {
    try {
        let game = await Game.findById(req.params.gameId);
        let gameJson = game.toJSON();
        gameJson._links = {
            "self": {
                "href": `http://${req.headers.host}/api/games/${req.params.gameId}`
            },
            "collection": {
                "href": `http://${req.headers.host}/api/games/`
            }
        };

        console.log(gameJson)
        res.status(200).send(gameJson);
    } 
    catch(err) {
        //error code not found
        res.status(404).json({message: err.message});
    }

})

    .put(function(req, res) {
        console.log(`PUT on api/games/${req.params.gameId}`);

        Game.findByIdAndUpdate(req.params.gameId, req.body, function (err, game) {
            console.log("game = " + game);
            console.log(req.body);

            if (!req.body.title & !req.body.desctiption & !req.body.manufacturer) {
                console.log("A field is empty");
                res.status(422).end();
            }
            else 
            {
                game.save(function (err) {
                    if (err) { 
                        res.status(400).send(err) 
                    }
                    else 
                    { 
                        res.status(200).json(game) 
                    }
                });
            }
        });
    })

    .delete(function(req, res) {
        console.log(`DELETE on api/games/${req.params.gameId}`);

        Game.findByIdAndDelete(req.params.gameId, function (err, game) {
            if (err) {
                res.status(400).send(err);
            }
            else
            {
                res.status(204).json(game);
            }
        })
    })

    .options(function(req, res) {
        console.log(`OPTIONS on api/games/${req.params.gameId}`);

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        res.header("Allow", "GET,PUT,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS");
        res.send();
    });
    

    


    return gamesRouter;
    
}


module.exports = router;