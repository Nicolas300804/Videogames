import axios from "axios"
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GENRES ="GET_GENRES"
export const GET_PLATFORMS="GET_PLATFORMS"
export const GET_VIDEOGAMEBYNAME= "GET_VIDEOGAMEBYNAME"

export const getvideogames=()=>{
    return async (dispatch) => {
        try {
          const response = await axios('http://localhost:3001/videogames')
    
          return dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
          })
        } catch (error) {
          throw Error(error)
        }
      }
}

export const getVideogameByName=(name)=>{
  return async (dispatch) => {
    try {
      const response = await axios(`http://localhost:3001/videogames?name=${name}`)

      return dispatch({
        type: GET_VIDEOGAMEBYNAME,
        payload: response.data
      })

    } catch (error) {
      throw Error(error)
    }
  }
}

export const getGenres=()=>{
    return async (dispatch) => {
        try {
          const response = await axios('http://localhost:3001/genres')
    
          return dispatch({
            type: GET_GENRES,
            payload: response.data
          })
        } catch (error) {
          throw Error(error)
        }
      }
}

export const getPlatforms =()=>{
  return async(dispatch)=>{
    try {
      const response = await axios('http://localhost:3001/platforms')

      return dispatch({
        type: GET_PLATFORMS,
        payload: response.data
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function postVideogame (obj) {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/videogames', obj)
      return response.data
    } catch (error) {
      throw Error(error)
    }
  }
}



//http://localhost:3001/videogames