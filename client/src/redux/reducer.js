//import React from 'react'
import {GET_VIDEOGAMES, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAMEBYNAME } from "./actions"

const initialState = {
  allVideogames : [],
  genres:[],
  platforms:[]
}

export const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return{
        ...state,
        allVideogames:action.payload
      }
      case GET_VIDEOGAMEBYNAME:
        return {
          ...state,
          allVideogames: action.payload
        }
      case GET_GENRES:
        return{
          ...state,
          genres:action.payload
        }
        case GET_PLATFORMS:
        return{
          ...state,
          platforms:action.payload
        }
      
  
    default:
      return state
  }
}

export default rootReducer
