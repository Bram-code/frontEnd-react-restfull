import { useEffect, useState } from "react";
import "./styles.css"

export function About(props) {

    const [detail, setDetail] = useState(null)
    const [info, setInfo] = useState(1)
    const [edit, setEdit] = useState(1)

    // edit game
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [manufacturer, setManufacturer] = useState("")

    const setEditValue = () => {
        setTitle(detail.title)
        setDescription(detail.description)
        setManufacturer(detail.manufacturer)
    }
    
    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('accept', 'application/json')

    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    }

    const loadJSON = () => {
        fetch(`http://145.24.222.103:8000/api/games/${props.detail}`, myInitGET)
            .then(res => res.json())
            .then(data => setDetail(data))
            .catch(error => console.log(error))
    }

    //DELETE request
    const myHeadersDELETE = new Headers();
    myHeadersDELETE.append('accept', 'application/json')

    const myInitDELETE = {
        method: 'DElETE',
        headers: myHeadersDELETE
    }

    const removeJSON = () => {
        fetch(`http://145.24.222.103:8000/api/games/${props.detail}`, myInitDELETE)
            .then(res => console.log(res))
            .then(() => location.reload())
            .catch(error => console.log(error))
    }

    //PUT request
    const myHeadersPUT = new Headers();
    myHeadersPUT.append('Accept', 'application/json')
    myHeadersPUT.append('Content-Type', 'application/json')

    const editJSON = () => {
        const myInitPUT = {
            method: 'PUT',
            headers: myHeadersPUT, 
            body: JSON.stringify({title: title, description: description, manufacturer: manufacturer})
        }

        fetch(`http://145.24.222.103:8000/api/games/${props.detail}`, myInitPUT)
            .then(res => console.log(res))
            .then(() => location.reload())
            .catch(error => console.log(error))
    }

    const onTitleChangeHandler = (event) => {
        setTitle(event.target.value)
    }

    const onDescriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

    const onManufacturerChangeHandler = (event) => {
        setManufacturer(event.target.value)
    }

    const loadEdit = () => {
        setEditValue()
        if (edit == 0) {
            setEdit(1)
        }else{
            setEdit(0)
        }

        setInfo(1)
    }

    const infoHandler = () => {
        loadJSON()
        
        if (info == 0) {
            setInfo(1)
        }else{
            setInfo(0)
        }
        
        setEdit(1)
    }

    return <div className="About">
        <div className="main">
            <h1><a href={`/detail/${props.detail}`}> { props.title}</a></h1>
            <div className={info == 1 ? "info" : "info2"} onClick={infoHandler}></div>
        </div>
        <h2>{info == 1 || detail && detail.description}</h2>
        <p>{info == 1 || detail && `Gemaakt door: ${detail.manufacturer}`}</p>
        {info == 1 || detail && <button onClick={removeJSON}>delete</button> }
        {info == 1 || detail && <button onClick={loadEdit}> edit </button>}

        {edit == 1 || detail && <div className="create">
                Title: <input type="text" onChange={onTitleChangeHandler} value={title} />    <br/>
                Description: <input type="text" onChange={onDescriptionChangeHandler} value={description} />    <br/>
                Manufacturer: <input type="text" onChange={onManufacturerChangeHandler} value={manufacturer} />    <br/>
                <button className="editButton" onClick={editJSON}>bewerken</button>
        </div> }


    
        </div>
        ;
  }