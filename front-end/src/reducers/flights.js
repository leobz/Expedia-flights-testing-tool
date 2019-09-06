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
                airlines: action.flights.availableAirlines,
                error: false,
                duration: {
                    available: action.flights.availableDurations,
                    max: action.flights.highestDuration,
                    min: action.flights.lowestDuration
                },
                flightNumbers: action.flights.availableFlightNumbers,
                itinerariesSize: action.flights.itinerariesSize,
                loading: false,
                segments: action.flights.flightCards,
                sortType: action.flights.sortType,
                stops: action.flights.availableStops
            };
        case FLIGHTS_FILTER_REQUESTED:
            return {...state, loading: true};
        case FLIGHTS_FILTER_SUCCEEDED:
            return {
                ...state,
                segments: action.flights.flightCards,
                loading: false,
                error: false
            };
        case ERROR_OCCURRED:
            return {...state, error: true, loading: false};
        default:
            return state;
    }
}
