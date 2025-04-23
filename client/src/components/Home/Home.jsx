import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvideogames, getGenres } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Searchbar from "../Searcbar/Searchbar";



const Home = () => {
  const dispatch = useDispatch();
  const allvideogames = useSelector((state) => state.allVideogames);
  const genres = useSelector((state)=>state.genres)

  useEffect(() => {
    dispatch(getvideogames());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getvideogames());
  // }, [dispatch]);

  function handleclick(event) {
    event.preventDefault();
    dispatch(getvideogames());
  }

  return (
    <div>
      <Link to="/create">Crear Videojuego</Link>
      <h1>Videojuegos</h1>
      <button
        onClick={(event) => {
          handleclick(event);
        }}
      >
        Volver a cargar videojuegos
      </button>
        
        <Searchbar/>

      <div>
        <select>
          <option value="asc">Ascenente</option>
          <option value="desc">Descenente</option>
        </select>

        <select>
          <option value="all"></option>
          <option value="Action"></option>
          <option value="Indie"></option>
          <option value="Adventure"></option>
          <option value="RPG"></option>
          <option value="Strategy"></option>
          <option value="Shooter"></option>
          <option value="Casual"></option>
          <option value="Simulation"></option>
          <option value="Puzzle"></option>
          <option value="Arcade"></option>
          <option value="Platformer"></option>
          <option value="Massively Multiplayer"></option>
          <option value="Racing"></option>
          <option value="Sports"></option>
          <option value="Fighting"></option>
          <option value="Family"></option>
          <option value="Board Games"></option>
          <option value="Educational"></option>
          <option value="Card"></option>
        </select>

        <select>
          <option value="default" disabled>
            Order by rating
          </option>
          <option value="Ascendent">Ascendent</option>
          <option value="Descendent">Descendent</option>
        </select>

        <select>
          <option value="default" disabled>
            Filter by source
          </option>
          <option value="All">Todos</option>
          <option value="api">Api</option>
          <option value="created">Db</option>
        </select>
        {allvideogames.map((game)=>(
         <Card
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.image}
            genres={game.genres}
        />
      ))}
      </div>
    </div>
  );
};

export default Home;
