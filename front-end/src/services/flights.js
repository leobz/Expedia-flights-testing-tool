/* global localStorage */
import Http from './http';

export default class FlightsService {
    static getFlights(segments) {
        const body = {
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: segments,
            filters: {
                amount_of_stop: {selected: false, amount: []},
                airlines: {selected: false, airline_name: ''},
                price_range: {selected: false, prices: []},
                fligth_number: {selected: false, flight_number: ''}
            },
            sortType: 'priceLowest'
        };
        return Http.post(`${ENDPOINT}ui_test`, body);
    }

    static filterFlights(filters, segments) {
        return Http.post(`${ENDPOINT}ui_test`, {
            filters,
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: segments,
            sortType: 'priceLowest'
        });
    }
}
