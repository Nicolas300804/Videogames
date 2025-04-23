import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideogameByName } from "../../redux/actions";  
import styles from "./Searchbar.module.css"


const Searchbar = () => {

    const dispatch= useDispatch()
    const [name, setName]=useState('')
    const handleInputChange = (event)=>{
        event.preventDefault()
        setName(event.target.value)
    }

    const handleSubmit= (event)=>{
        event.preventDefault();
        dispatch(getVideogameByName(name))
    }


  return (
    <div>
        <input className={styles.menu} type='text' placeholder='Search Videogame...' onChange={handleInputChange} />
        <button className={styles.btn} type='submit' onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default Searchbar