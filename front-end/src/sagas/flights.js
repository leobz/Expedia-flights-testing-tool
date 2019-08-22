import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {
    receiveFlights, receiveFilteredFlights
} from '../actions/flights';

import FlightsService from '../services/flights';

export function* fetchFlights() {
    try {
        const flights = yield call(FlightsService.getFlights);
        yield put(receiveFlights(flights));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* filterFlights({filters}) {
    try {
        const filteredFlights = yield call(FlightsService.filterFlights, filters);
        yield put(receiveFilteredFlights(filteredFlights));
    } catch (err) {
        yield put(handleError(err));
    }
}
