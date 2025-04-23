import React from "react";
import style from "./Card.module.css"
import { Link } from "react-router-dom";

export default function Card ({ name, image, genres, id }) {
  const genreNames = genres.map((genre) => genre.name || genre);

  return (
    <div className={style.box}>
      <Link to={`/detail/${id}`}>
        <img className={style.imagen} src={image} alt="img not found" width="100px" />
        <h3>{name}</h3>
        <h4>{genreNames.join("-")}</h4>
      </Link>
    </div>
  );
  }