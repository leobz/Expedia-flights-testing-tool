/* global localStorage */
import Http from './http';
import {defaultsFilters} from '../constants';

export default class FlightsService {
    static getFlights(segments) {
        const body = {
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: segments,
            filters: defaultsFilters,
            sortType: 'priceLowest'
        };
        return Http.post(`${ENDPOINT}ui_test`, body);
    }

    static filterFlights(filters, segments, sortType) {
        return Http.post(`${ENDPOINT}ui_test`, {
            filters,
            flightsData: localStorage.getItem('dataJson'),
            segmentsId: segments,
            sortType
        });
    }
}
