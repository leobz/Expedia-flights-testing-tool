export const FLIGHTS_FETCH_REQUESTED = 'FLIGHTS_FETCH_REQUESTED';
export const FLIGHTS_FETCH_SUCCEEDED = 'FLIGHTS_FETCH_SUCCEEDED';
export const FLIGHTS_FILTER_REQUESTED = 'FLIGHTS_FILTER_REQUESTED';
export const FLIGHTS_FILTER_SUCCEEDED = 'FLIGHTS_FILTER_SUCCEEDED';

export const receiveFlights = flights => ({
    type: FLIGHTS_FETCH_SUCCEEDED,
    flights
});

export const requestFlights = () => ({
    type: FLIGHTS_FETCH_REQUESTED
});

export const requestFilterFlights = filters => ({
    type: FLIGHTS_FILTER_REQUESTED,
    filters
});

export const receiveFilteredFlights = flights => ({
    type: FLIGHTS_FILTER_SUCCEEDED,
    flights
});
