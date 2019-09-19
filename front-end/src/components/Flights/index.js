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
import {flightsSelector, segmentsSelector} from './selectors';

const Flights = ({
    duration,
    itinerariesSize,
    loading,
    prices
}) => {
    const [segmentsId, setSegmentsId] = useState([]);
    const [filters, setFilters] = useState(defaultsFilters);
    const [sortType, setSortType] = useState('priceLowest');
    const [selectedSegments, setSelectedSegments] = useState([]);

    const dispatch = useDispatch();
    const {airlines,flightNumbers, stops} = useSelector(state => flightsSelector(state));
    const segments = useSelector(state => segmentsSelector(state));

    useEffect(() => {
        dispatch(requestFlights(segmentsId));
        setFilters(defaultsFilters);
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

    const handleDuration = (min, max) => {
        if (min && max) {
            return filterItems(
                {...filters, duration_range: {selected: true, durations: [min, max]}}
            );
        }
        return filterItems(
            {...filters, duration_range: {selected: false, durations: ['', '']}}
        );
    };

    const handlePrices = (min, max) => {
        if (min && max) {
            return filterItems(
                {...filters, price_range: {selected: true, prices: [min, max]}}
            );
        }
        return filterItems(
            {...filters, price_range: {selected: false, prices: ['', '']}}
        );
    };

    const filterStrategies = [{
        label: 'Airlines',
        data: airlines,
        onChange: handleAirlines
    }, {
        label: 'Stops',
        data: stops,
        onChange: handleStops
    }, {
        label: 'Flight Number',
        data: flightNumbers,
        onChange: handleFlightNumber
    }/*, {
        label: 'Duration',
        data: duration,
        onChange: handleDuration
    }, {
        label: 'Price',
        data: prices,
        onChange: handlePrices
    }*/];

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
                    {airlines && stops && (
                        <FilterPanel
                            filters={filterStrategies}
                            handleStopsClick={selectedStops => handleStops(selectedStops)}
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
    duration: PropTypes.shape({
        available: PropTypes.arrayOf(PropTypes.string),
        max: PropTypes.string,
        min: PropTypes.string
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    itinerariesSize: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    prices: PropTypes.shape({
        available: PropTypes.arrayOf(PropTypes.number),
        max: PropTypes.string,
        min: PropTypes.string
    })
};

Flights.defaultProps = {
    duration: {
        available: [],
        max: '',
        min: ''
    },
    history: null,
    itinerariesSize: 1,
    prices: {
        available: [],
        max: '',
        min: ''
    }
};

const mapStateToProps = state => ({
    duration: state.flights.duration,
    itinerariesSize: state.flights.itinerariesSize,
    loading: state.flights.loading,
    prices: state.flights.prices
});

export default connect(
    mapStateToProps
)(Flights);
