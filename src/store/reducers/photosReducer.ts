import {Photo} from 'pexels'
import {PhotosState, PhotosAction, GET_PHOTOS, SET_ERROR} from '../types'


//assigning the initial values to PhotoState, which we defined the structure and data types in types.ts
const initialState: PhotosState = {
  photos:[],
  total_results: 0,
  error: ''
}


/* 
PhotosActions are the actions described by the action.ts, where structure and data types 
are defined in types.ts the reducer will conduct the described actions and update the 
PhotosState accordingly and return the updated PhotosState
*/

//standard boilerplate reducer
const photoReducer = (state = initialState, action: PhotosAction): PhotosState => {
  switch(action.type) {
    case GET_PHOTOS:
      const {page, photos, total_results} = action.payload //this is the structure and data types of GET_PHOTOS
      let photosArr: Photo[] = []
      if (page > 1) {
         // if there is more than 1 page, then ...state.photos = photos already loaded, ...photos = new loaded photos
        photosArr = [...state.photos, ...photos]
      } else {
        // if its just one page or less then just the array of new photos
        photosArr = photos;
      }
      return {
        // the updated PhotosState
        ...state, // previous states
        photos: photosArr,
        total_results: total_results,
        error: ''
      }
      case SET_ERROR:
        return {
          ...state,
          error: action.payload
        }
        default:
          return state;
  }
}

export default photoReducer