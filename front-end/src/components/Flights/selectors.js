import {createSelector} from 'reselect';

const getAirlines = state => state.flights.airlines;
const getFlightNumbers = state => state.flights.flightNumbers;
const getSegments = state => state.flights.segments;
const getStops = state => state.flights.stops;

export const flightsSelector = createSelector(
    getAirlines, getFlightNumbers, getStops,
    (airlines, flightNumbers, stops) => ({airlines, flightNumbers, stops})
);

export const segmentsSelector = createSelector(
    [getSegments],
    segments => segments
);
