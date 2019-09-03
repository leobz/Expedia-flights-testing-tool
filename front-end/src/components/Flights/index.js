import React, {Fragment, useEffect, useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {find} from 'lodash';
import {requestFlights, requestFilterFlights} from '../../actions/flights';
import Segments from './Segments';
import LoadingButton from '../common/LoadingButton';
import FlightHeader from '../FlightsHeader';
import FilterPanel from '../FilterPanel/FilterPanel';

const Flights = ({airlines, flightNumbers, itinerariesSize, loading, stops}) => {
    const [segmentsId, setSegmentsId] = useState([]);
    const [filters, setFilters] = useState({
        amount_of_stop: {selected: false, amount: []},
        airlines: {selected: false, airline_name: []},
        price_range: {selected: false, prices: [0, 0]},
        fligth_number: {selected: false, flight_number: 0}
    });
    const [sortType, setSortType] = useState('priceLowest');
    const [selectedSegments, setSelectedSegments] = useState([]);

    const dispatch = useDispatch();
    const segments = useSelector(state => state.flights.segments);

    useEffect(() => {
        dispatch(requestFlights(segmentsId));
    }, [segmentsId]);

    const handleSegments = id => {
        setSegmentsId([...segmentsId, id]);
        const newSegmentData = find(segments, segment => segment.zid === id);
        setSelectedSegments([...selectedSegments, newSegmentData]);
        dispatch(requestFlights(segmentsId));
    };

    const filterItems = (filter, sortKey = sortType) => {
        dispatch(requestFilterFlights(filter, segmentsId, sortKey));
        setFilters(filter);
        setSortType(sortKey);
    };

    const handleSort = sortKey => {
        return filterItems(filters, sortKey);
    };

    const handleAirlines = airlinesSelected => {
        if (airlinesSelected.length > 0) {
            return filterItems({...filters, airlines: {selected: true, airline_name: airlinesSelected}});
        }
        return filterItems({...filters, airlines: {selected: false, airline_name: []}});
    };

    const handleFlightNumber = flightNumber => {
        if (flightNumber) {
            return filterItems({...filters, fligth_number: {selected: true, flight_number: flightNumber}});
        }
        return filterItems({...filters, fligth_number: {selected: false, flight_number: 0}});
    };

    const handleStops = selectedStops => {
        if (selectedStops.length > 0) {
            return filterItems({...filters, amount_of_stop: {selected: true, amount: selectedStops}});
        }
        return filterItems({...filters, amount_of_stop: {selected: false, amount: []}});
    };

    return (
        <Fragment>
            {loading && <LoadingButton label="Loading..."/>}
            {segments && (
                <FlightHeader
                    flightsFound={segments.length}
                    handleSelect={value => handleSort(value)}
                    selectedSegments={selectedSegments}
                    sortType={sortType}
                />
            )}
            <Row>
                <Col sm={4}>
                    {airlines.length > 0 && stops && (
                        <FilterPanel
                            airlines={airlines}
                            flightNumbers={flightNumbers}
                            handleAirlinesClick={airlinesSelected => handleAirlines(
                                airlinesSelected
                            )}
                            handleFlightNumber={value => handleFlightNumber(value)}
                            handleStopsClick={selectedStops => handleStops(selectedStops)}
                            stops={stops}
                        />
                    )}
                </Col>
                <Col sm={8}>
                    {segments && segments.map(segment => {
                        const segmentProps = {itinerariesSize, segment, segmentsId};
                        return (
                            <Col key={segment.zid} className="flights">
                                <Segments handleClick={id => handleSegments(id)} {...segmentProps}/>
                            </Col>
                        );
                    })}
                </Col>
            </Row>
        </Fragment>
    );
};

Flights.propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.string),
    flightNumbers: PropTypes.arrayOf(PropTypes.string),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    itinerariesSize: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    stops: PropTypes.shape()
};

Flights.defaultProps = {
    airlines: [],
    flightNumbers: [],
    history: null,
    itinerariesSize: 1,
    stops: null
};

const mapStateToProps = state => ({
    airlines: state.flights.airlines,
    flightNumbers: state.flights.flightNumbers,
    itinerariesSize: state.flights.itinerariesSize,
    loading: state.flights.loading,
    stops: state.flights.stops
});

export default connect(
    mapStateToProps
)(Flights);
