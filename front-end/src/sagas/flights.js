import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {
    receiveFlights, receiveFilteredFlights
} from '../actions/flights';

import FlightsService from '../services/flights';

export function* fetchFlights({segments}) {
    try {
        const flights = yield call(FlightsService.getFlights, segments);
        yield put(receiveFlights(flights));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* filterFlights({filters, segments, sortKey}) {
    try {
        const filteredFlights = yield call(FlightsService.filterFlights, filters, segments, sortKey);
        yield put(receiveFilteredFlights(filteredFlights));
    } catch (err) {
        yield put(handleError(err));
    }
}
