/* global localStorage */
import Http from './http';

export default class FlightsService {
    static getFlights() {
        const body = {
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: [],
            filters: {
                amount_of_stop: {selected: false, amount: '0'},
                airlines: {selected: false, airline_name: 'American Airlines'},
                price_range: {selected: false, prices: ['28000', '29000']},
                fligth_number: {selected: false, flight_number: '2536'}
            },
            sortType: 'lower_price'
        };
        return Http.post(`${ENDPOINT}ui_test`, body);
    }

    static filterFlights(airlines, flightNumber, step, tripType, stops, max, min) {
        return Http.get(
            `${ENDPOINT}api/itineraries/${tripType}/filter?airlines=${airlines}&flightNumber=${flightNumber}&step=${step}&stops=${stops}&max=${max}&min=${min}`
        );
    }
}
