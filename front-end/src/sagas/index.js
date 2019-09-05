import {takeEvery, all} from 'redux-saga/effects';
import {
    ERROR_OCCURRED
} from '../actions';
import {
    FLIGHTS_FETCH_REQUESTED,
    FLIGHTS_FILTER_REQUESTED
} from '../actions/flights';
import {fetchFlights, filterFlights} from './flights';
import handleError from './common';

export default function* root() {
    yield all([
        takeEvery(FLIGHTS_FETCH_REQUESTED, fetchFlights),
        takeEvery(FLIGHTS_FILTER_REQUESTED, filterFlights),
        takeEvery(ERROR_OCCURRED, handleError)
    ]);
}
