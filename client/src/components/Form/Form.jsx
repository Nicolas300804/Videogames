import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { postVideogame, getPlatforms, getGenres, getvideogames } from '../../redux/actions'
import { validate } from './validate'
//import { useNavigate } from 'react-router-dom'
import styles from './Form.module.css'

export default function CreateVideogame () {
  //const navigate = useNavigate()
  const dispatch = useDispatch()
  const allGenres = useSelector(state => state.genres)
  const platformsApi = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  const [errors, setErrors] = useState({})

  const [videogame, setVideogame] = useState({
    name: '',
    description: '',
    image: '',
    platforms: [],
    rating: '',
    genres: [],
    released: ''
  })

  useEffect(() => {
    if (genres.length === 0) dispatch(getGenres())
  }, [dispatch, genres.length])

  const handleChange = (event) => {
    setVideogame({
      ...videogame,
      [event.target.name]: event.target.value
    })
    //Se define la función handleChange para manejar los cambios en los campos del formulario 
    //y actualizar el estado.
    setErrors(validate({
      ...videogame,
      [event.target.name]: event.target.value
    }))
  }

  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch])

  const handleSelectGenre = (event) => {
    const checkGenres = videogame.genres
    if (!checkGenres.includes(event.target.value)) {
      checkGenres.push(event.target.value)
    }
    setVideogame({
      ...videogame,
      genres: checkGenres
    })
    setErrors(validate({
      ...videogame,
      [event.target.name]: event.target.value
    }))
  }

  const handleDeleteGenres = (event) => {
    setVideogame({
      ...videogame,
      genres: videogame.genres.filter(gen => gen !== event)
    })
  }

  const handleSelectPlatforms = (event) => {
    const checkPlatforms = videogame.platforms
    if (!checkPlatforms.includes(event.target.value)) {
      checkPlatforms.push(event.target.value)
    }
    setVideogame({
      ...videogame,
      platforms: checkPlatforms
    })
    setErrors(validate({
      ...videogame,
      [event.target.name]: event.target.value
    }))
  }

  const handleDeletePlatform = (event) => {
    setVideogame({
      ...videogame,
      platforms: videogame.platforms.filter(plat => plat !== event)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postVideogame(videogame))    
    .then(response => {
      dispatch(getvideogames())  //Se define la función handleSubmit para manejar el envío del formulario, realizar la llamada a la API para crear un nuevo videojuego y manejar la respuesta.
      window.alert(response)     //del formulario, realizar la llamada a la API para crear un nuevo videojuego y manejar la respuesta.
      })
      .catch(error => window.alert(error.message))
     //navigate('/home')
  }

  return (
    <div className={styles.container}>
      <h1>Create your videogame</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.containerBoxes}>
          <label>Name: </label>
          <input className={styles.inputs} type='text' name='name' value={videogame.name} onChange={handleChange} placeholder='Enter a name' />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

          <label>Description: </label>
          <textarea className={styles.description} type='text' name='description' value={videogame.description} onChange={handleChange} placeholder='Write a description...' />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}

          <label>Image: </label>
          <input className={styles.inputs} type='text' name='image' value={videogame.image} onChange={handleChange} placeholder='Insert a image' />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}

          <label>Relesead: </label>
          <input className={styles.dates} type='date' name='released' value={videogame.released} onChange={handleChange} />
          {errors.released && <p style={{ color: 'red' }}>{errors.released}</p>}

          <label>Rating: </label>
          <input className={styles.inputs} type='number' name='rating' value={videogame.rating} step={0.01} onChange={handleChange} placeholder='Insert a rating'/>
          {errors.rating && <p style={{ color: 'red' }}>{errors.rating}</p>}

          
          <label htmlFor='genres'>Genres: </label>
          <select className={styles.genre} id='genres' onChange={handleSelectGenre}>
            <option>Choose one o more</option>
            {allGenres?.map(genre => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors.genres && <p style={{ color: 'red' }}>{errors.genres}</p>}

          <ul>
            {videogame.genres.map(gen =>
              <div key={gen} className={styles.Container}>
                <button className={styles.btn0} onClick={() => handleDeleteGenres(gen)}>X</button>
                <li>{gen}</li>
              </div>
            )}
          </ul>
              

          <label htmlFor='platforms'>Platforms: </label>
          <select className={styles.platform} id='platforms' onChange={handleSelectPlatforms}>
            <option>Choose one o more</option>
            {platformsApi.map(plat => (
              <option key={plat}>
                {plat}
              </option>
            ))}
          </select>
          {errors.platforms && <p style={{ color: 'red' }}>{errors.platforms}</p>}

          <ul>
            {videogame.platforms.map(plat =>
              <div key={plat} id={styles.Container1}>
                <button onClick={() => handleDeletePlatform(plat)}>X</button>
                <li>{plat}</li>
              </div>
            )}
          </ul>

        </div>

        <button className={styles.btn} type='submit' disabled={(Object.keys(errors).length > 0) || videogame.name === ''}>Create Videogame</button>

      </form>

    </div>
  )
}