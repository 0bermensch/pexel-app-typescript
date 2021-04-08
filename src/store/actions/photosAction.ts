import {createClient, PhotosWithTotalResults, ErrorResponse, Photos, Photo} from 'pexels'
import { isPhotos } from 'pexels/dist/typeCheckers';
import {ThunkAction} from 'redux-thunk'

import {RootState} from '../';
import {PhotosAction, GET_PHOTOS, SET_ERROR} from '../types'

const client = createClient('563492ad6f9170000100000115decda340e04350a2fc1aa753eeb5ba' || '');

export const getPhotos = (page:number, searchQuery: string, onSuccess:() => void, onError: () => void): 
ThunkAction<void, RootState, null, PhotosAction> =>{
  return async dispatch => {
    try{
      const photos: PhotosWithTotalResults | ErrorResponse = await client.photos.search({page, query: searchQuery,
      per_page: 10});

      if("error" in photos){
        throw new Error(photos.error);
      } else {
        dispatch({
          type: GET_PHOTOS,
          payload: {
            photos: photos.photos,
            page: page,
            total_results: photos.total_results
          }
        })
        onSuccess()
      }
    } catch (err) {
      dispatch(setError(err.message))
      onError();
    }
  }
}

export const getCuratedPhotos = (page: number, onSuccess: () => void, onError: () => void):
ThunkAction<void, RootState, null, PhotosAction> => {
  return async dispatch => {
    try {
      const photos: Photos | ErrorResponse = await client.photos.curated({page, per_page: 10});
       if("error" in photos){
        throw new Error(photos.error);
      } else {
        dispatch({
          type: GET_PHOTOS,
          payload: {
            photos: photos.photos,
            page: page,
            total_results: 0
          }
        })
        onSuccess()
      }
    } catch (err) {
      dispatch(setError(err.message))
      onError();
    }
  }
}

export const setError = (err: string): PhotosAction => {
  return {
    type: SET_ERROR,
    payload: err
  }
}