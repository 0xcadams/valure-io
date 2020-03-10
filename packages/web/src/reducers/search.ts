import { ActionType, getType } from 'typesafe-actions';

import * as actions from '@actions/SearchActions';

/**
 * INITIAL_STATE
 */
export interface ISearchState {
  readonly lastUpdated: number;
  readonly error?: Error;
  readonly isFetching: boolean;
  readonly autocompletePredictions: google.maps.places.AutocompletePrediction[];
  readonly geocoderResult?: google.maps.GeocoderResult;
}

export const initialSearchState: ISearchState = {
  lastUpdated: 0,
  error: undefined,
  isFetching: false,
  autocompletePredictions: [],
  geocoderResult: undefined
};

/**
 * REDUCER
 */
export const SearchReducer = (
  state: ISearchState = initialSearchState,
  action: ActionType<typeof actions>
): ISearchState => {
  switch (action.type) {
    case getType(actions.getPlacePredictions.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.getPlacePredictions.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        lastUpdated: Date.now(),
        autocompletePredictions: action.payload
      };
    case getType(actions.getPlacePredictions.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.clearPlacePredictions):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        lastUpdated: Date.now(),
        autocompletePredictions: []
      };

    case getType(actions.getPlaceForQuery.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.getPlaceForQuery.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        lastUpdated: Date.now(),
        geocoderResult: action.payload
      };
    case getType(actions.getPlaceForQuery.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};
