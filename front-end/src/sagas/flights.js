import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {
    receiveFlights, receiveFilteredFlights
} from '../actions/flights';

import FlightsService from '../services/flights';

export function* fetchFlights() {
    try {
        const flights = yield call(FlightsService.getFlights);
        yield put(receiveFlights(flights.payload));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* filterFlights({airlines, flightNumber, step, tripType, stops, max, min}) {
    try {
        const filteredFlights = yield call(
            FlightsService.filterFlights,
            airlines,
            flightNumber,
            step,
            tripType,
            stops,
            max,
            min);
        yield put(receiveFilteredFlights(filteredFlights.payload));
    } catch (err) {
        yield put(handleError(err));
    }
}
