/* global localStorage */
import Http from './http';

export default class FlightsService {
    static getFlights() {
        const body = {
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: [],
            filters: {
                amount_of_stop: {selected: false, amount: []},
                airlines: {selected: false, airline_name: ''},
                price_range: {selected: false, prices: []},
                fligth_number: {selected: false, flight_number: ''}
            },
            sortType: 'lower_price'
        };
        return Http.post(`${ENDPOINT}ui_test`, body);
    }

    static filterFlights(filters) {
        return Http.post(`${ENDPOINT}ui_test`, {
            filters,
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: [],
            sortType: 'lower_price'
        });
    }
}
