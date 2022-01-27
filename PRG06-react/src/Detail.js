import "./styles.css"
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

export function Detail () {

    //overzicht games
    const [game, setGame] = useState([])

    let params = useParams();
s
    console.log(params)

    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('accept', 'application/json')

    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    }

    const loadJSON = () => {
        fetch(`http://145.24.222.103:8000/api/games/${params.gameId}`, myInitGET)
            .then(res => res.json())
            .then(data => updateGame(data))
            .catch(error => console.log(error))
    }

    function updateGame(game){
        setGame(game)
    }

    const goBack = () => {
        window.location = '/'
    }

    useEffect(loadJSON, [])

    return <div className="App">
        <div className="details">
            <h1>{game.title}</h1>
            <h2>Beschrijving:{game.description}</h2>
            <p>Gemaakt door:{game.manufacturer}</p>
            <button onClick={goBack}>Terug</button>
        </div>
        
    </div>
    
  }