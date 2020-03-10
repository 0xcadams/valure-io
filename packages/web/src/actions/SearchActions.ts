import { createAction, createAsyncAction } from 'typesafe-actions';

/*
 * SEARCH ACTIONS
 */

export interface IPlacePredictionsRequest {
  input: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export const getPlacePredictions = createAsyncAction(
  'search/GET_PLACE_PREDICTIONS_REQUEST',
  'search/GET_PLACE_PREDICTIONS_SUCCESS',
  'search/GET_PLACE_PREDICTIONS_FAILURE'
)<
  IPlacePredictionsRequest,
  google.maps.places.AutocompletePrediction[],
  Error
>();

export const clearPlacePredictions = createAction(
  'search/CLEAR_PLACE_PREDICTIONS'
)<void>();

export const getPlaceForQuery = createAsyncAction(
  'search/GET_PLACE_FOR_QUERY_REQUEST',
  'search/GET_PLACE_FOR_QUERY_SUCCESS',
  'search/GET_PLACE_FOR_QUERY_FAILURE'
)<string, google.maps.GeocoderResult, Error>();
