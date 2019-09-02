import React, {Fragment, useEffect, useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {requestFlights, requestFilterFlights} from '../../actions/flights';
import Airlines from '../Airlines';
import Segments from './Segments';
import Stops from '../Stops';
import LoadingButton from '../common/LoadingButton';
import FlightHeader from '../FlightsHeader';

const Flights = ({airlines, itinerariesSize, loading, stops}) => {
    const [segmentsId, setSegmentsId] = useState([]);
    const [filters, setFilters] = useState({
        amount_of_stop: {selected: false, amount: []},
        airlines: {selected: false, airline_name: []},
        price_range: {selected: false, prices: [0, 0]},
        fligth_number: {selected: false, flight_number: 0}
    });
    const [sortType, setSortType] = useState('priceLowest');

    const dispatch = useDispatch();
    const segments = useSelector(state => state.flights.segments);

    useEffect(() => {
        dispatch(requestFlights(segmentsId));
    }, [segmentsId]);

    const handleSegments = id => {
        setSegmentsId([...segmentsId, id]);
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
                    sortType={sortType}
                />
            )}
            <Row>
                <Col sm={4}>
                    {airlines.length > 0 && (
                        <Fragment>
                            <h4>Airlines</h4>
                            <Airlines
                                handleClick={airlinesSelected => handleAirlines(
                                    airlinesSelected
                                )}
                                airlines={airlines}
                            />
                        </Fragment>
                    )}
                    {stops && (
                        <Fragment>
                            <h4>Stops</h4>
                            <Stops
                                handleClick={selectedStops => handleStops(selectedStops)}
                                stops={stops}
                            />
                        </Fragment>
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
    itinerariesSize: PropTypes.number,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    loading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            tripType: PropTypes.string
        })
    }).isRequired,
    priceRange: PropTypes.shape({
        max: PropTypes.number,
        min: PropTypes.number
    }).isRequired,
    stops: PropTypes.shape()
};

Flights.defaultProps = {
    airlines: [],
    history: null,
    itinerariesSize: 1,
    stops: null
};

const mapStateToProps = state => ({
    airlines: state.flights.airlines,
    itinerariesSize: state.flights.itinerariesSize,
    loading: state.flights.loading,
    stops: state.flights.stops
});

export default connect(
    mapStateToProps
)(Flights);
