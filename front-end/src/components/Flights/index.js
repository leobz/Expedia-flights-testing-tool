import React, {useEffect, useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {find} from 'lodash';
import {requestFlights, requestFilterFlights} from '../../actions/flights';
import {defaultsFilters} from '../../constants';
import Segments from './Segments';
import LoadingButton from '../common/LoadingButton';
import FlightHeader from '../FlightsHeader';
import FilterPanel from '../FilterPanel/FilterPanel';

const Flights = ({
    airlines,
    duration,
    flightNumbers,
    itinerariesSize,
    loading,
    stops
}) => {
    const [segmentsId, setSegmentsId] = useState([]);
    const [filters, setFilters] = useState(defaultsFilters);
    const [sortType, setSortType] = useState('priceLowest');
    const [selectedSegments, setSelectedSegments] = useState([]);

    const dispatch = useDispatch();
    const segments = useSelector(state => state.flights.segments);

    useEffect(() => {
        dispatch(requestFlights(segmentsId));
    }, [segmentsId]);

    const handleSegments = id => {
        const newSegmentData = find(segments, segment => segment.zid === id);
        setSelectedSegments([...selectedSegments, newSegmentData]);
        setSegmentsId([...segmentsId, id]);
    };

    const filterItems = (filter, sortKey = sortType) => {
        dispatch(requestFilterFlights(filter, segmentsId, sortKey));
        setFilters(filter);
        setSortType(sortKey);
    };

    const handleSort = sortKey => filterItems(filters, sortKey);

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

    const handleDuration = (min, max) => filterItems(
        {...filters, duration_range: {selected: true, durations: [min, max]}}
    );

    return (
        <>
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
                            duration={duration}
                            flightNumbers={flightNumbers}
                            handleAirlinesClick={airlinesSelected => handleAirlines(
                                airlinesSelected
                            )}
                            handleDuration={(min, max) => handleDuration(min, max)}
                            handleFlightNumber={value => handleFlightNumber(value)}
                            handleStopsClick={selectedStops => handleStops(selectedStops)}
                            stops={stops}
                        />
                    )}
                </Col>
                <Col sm={8}>
                    {segments && segments.map(segment => (
                        <Col key={segment.zid} className="flights">
                            <Segments
                                itinerariesSize={itinerariesSize}
                                segment={segment}
                                segmentsId={segmentsId}
                                handleClick={id => handleSegments(id)}
                            />
                        </Col>
                    ))}
                </Col>
            </Row>
        </>
    );
};

Flights.propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.shape),
    duration: PropTypes.shape({
        available: PropTypes.arrayOf(PropTypes.string),
        max: PropTypes.string,
        min: PropTypes.string
    }),
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
    duration: {
        available: [],
        max: '',
        min: ''
    },
    flightNumbers: [],
    history: null,
    itinerariesSize: 1,
    stops: null
};

const mapStateToProps = state => ({
    airlines: state.flights.airlines,
    duration: state.flights.duration,
    flightNumbers: state.flights.flightNumbers,
    itinerariesSize: state.flights.itinerariesSize,
    loading: state.flights.loading,
    stops: state.flights.stops
});

export default connect(
    mapStateToProps
)(Flights);
