import {
    FLIGHTS_FETCH_REQUESTED,
    FLIGHTS_FETCH_SUCCEEDED,
    FLIGHTS_FILTER_REQUESTED,
    FLIGHTS_FILTER_SUCCEEDED
} from '../actions/flights';

import {
    ERROR_OCCURRED
} from '../actions';

export default function flights(state = {loading: false, error: false}, action) {
    switch (action.type) {
        case FLIGHTS_FETCH_REQUESTED:
            return {...state, loading: true};
        case FLIGHTS_FETCH_SUCCEEDED:
            return {
                ...state,
                airlines: action.flights.shop_response_airlines,
                error: false,
                flights: action.flights,
                itineraries: action.flights.itineraries,
                loading: false,
                priceRange: action.flights.priceRange,
                segments: action.flights.shop_response_segments
            };
        case FLIGHTS_FILTER_REQUESTED:
            return {...state, loading: true};
        case FLIGHTS_FILTER_SUCCEEDED:
            return {
                ...state,
                itineraries: action.flights.itineraries,
                loading: false,
                error: false
            };
        case ERROR_OCCURRED:
            return {...state, error: true, loading: false};
        default:
            return state;
    }
}
