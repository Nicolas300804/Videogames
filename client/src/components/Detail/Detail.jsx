import axios from "axios";
import React from "react";
import style from "./Detail.module.css"
import { Link } from "react-router-dom";
//import { getPokemonsByID } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Detail = () => {
  const { id } = useParams();
  const [detailGame, setdetailGame] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((response) => setdetailGame(response.data)) //yo accedo al id del pokemon a detallar
      .catch((error) => console.error(error));
    
  }, [id]);

  return (
    <div className={style.detail}>
      {detailGame && (
        <div>
          <p>ID: {detailGame.id}</p>
          <p>Name: {detailGame.name}</p>
          <img src={detailGame.image} alt={detailGame.name} width="250px" />
          <p>Plataforma: {detailGame.platforms}</p>
          <p>Description: {detailGame.description}</p>
          <p>Fecha de lanzamiento: {detailGame.released}</p>
          <p>Calificación: {detailGame.rating}</p>
          <p>Genero: {detailGame.genres}</p>
          <Link to={"/home"}>
            <button>Volver</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Detail;