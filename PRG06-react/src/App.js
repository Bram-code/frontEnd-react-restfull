import "./styles.css"
import { About } from "./About"
import { Detail } from "./detail"
import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

export function App(props) {

    //overzicht games
    const [games, setGames] = useState([])


    // nieuwe game
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [manufacturer, setManufacturer] = useState("")

    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('accept', 'application/json')

    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    }

    
    const loadJSON = () => {
        fetch(`http://145.24.222.103:8000/api/games`, myInitGET)
            .then(res => res.json())
            .then(data => setGames(data.items))
            .catch(error => console.log(error))
    }

    //POST request
    const myHeadersPOST = new Headers();
    myHeadersPOST.append('Accept', 'application/json')
    myHeadersPOST.append('Content-Type', 'application/json')

    const sendJSON = () => {
        const myInitPOST = {
            method: 'POST',
            headers: myHeadersPOST, 
            body: JSON.stringify({title: title, description: description, manufacturer: manufacturer})
        }

        fetch(`http://145.24.222.103:8000/api/games`, myInitPOST)
            .then(() => loadJSON())
            .catch(error => console.log(error))
    }

    const aboutComponents = games.map((game, index) => {
        return <About key={game._id} title={game.title} detail={game._id} />
    })

    const onTitleChangeHandler = (event) => {
        setTitle(event.target.value)
    }

    const onDescriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

    const onManufacturerChangeHandler = (event) => {
        setManufacturer(event.target.value)
    }

    useEffect(loadJSON, [])


    return (
        <BrowserRouter>
        <Routes>
        

        <Route exact path="/" element={<div className="App">

            <header >
                <div>
                    <i>Gemaakt door Bram Ekelschot</i>
                </div>
        
                <div className="title">
                    <br/>
                    <h1>De games API</h1>
                    <h2>Voeg toe of verander je favourite games!</h2>
                </div>
        
                <div className="create">
                    Title: <input type="text" onChange={onTitleChangeHandler} value={title} />    <br/>
                    Description: <input type="text" onChange={onDescriptionChangeHandler} value={description} />    <br/>
                    Manufacturer: <input type="text" onChange={onManufacturerChangeHandler} value={manufacturer} />    <br/>
                    <button onClick={sendJSON}>Add your own!</button>
                </div>
    
            </header>

            
    
            <div className="allAbout">
                {aboutComponents} 
            </div>
    
            </div>}>
        </Route>

        <Route path="/detail/:gameId" element={<Detail/> }/>
           
    </Routes>
    </BrowserRouter>
    )
    
  }