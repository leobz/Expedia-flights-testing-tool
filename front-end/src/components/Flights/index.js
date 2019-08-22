import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, FormControl, Row} from 'react-bootstrap';
import {requestFlights, requestFilterFlights} from '../../actions/flights';
import LoadingButton from '../common/LoadingButton';
import Segments from './Segments';
import Airlines from '../Airlines';
import Stops from '../Stops';
import PriceRange from '../PriceRange';


class Flights extends PureComponent {
    static propTypes = {
        airlines: PropTypes.arrayOf(PropTypes.string),
        itineraries: PropTypes.arrayOf(),
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
        requestFlights: PropTypes.func.isRequired,
        requestFilterFlights: PropTypes.func.isRequired,
        segments: PropTypes.arrayOf({
            airlines: PropTypes.arrayOf(
                PropTypes.string
            ),
            departure_time: PropTypes.string,
            duration: PropTypes.string,
            flight_numbers: PropTypes.arrayOf(
                PropTypes.string
            ),
            from: PropTypes.string,
            price: PropTypes.number,
            stops: PropTypes.number,
            to: PropTypes.string,
            zid: PropTypes.string
        }),
        stops: PropTypes.shape()
    };

    static defaultProps = {
        airlines: [],
        history: null,
        itineraries: [],
        segments: [],
        stops: null
    };

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                amount_of_stop: {selected: false, amount: []},
                airlines: {selected: false, airline_name: ''},
                price_range: {selected: false, prices: [0, 0]},
                fligth_number: {selected: false, flight_number: 0}
            },

        };
    }

    componentDidMount() {
        this.props.requestFlights();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.segments !== this.props.segments) {
            this.updateState(this.props.segments);
        }
    }

    updateState(segments) {
        this.setState({segments});
    }

    handlePrices(max, min) {
        const {selectedAirlines, flightNumber} = this.state;
        this.setState({max, min});
        this.filterItems(
            selectedAirlines,
            flightNumber,
            max,
            min
        );
    }

    handleAirlines(airlines) {
        const {filters} = this.state;
        if (airlines.length > 0) {
            filters.airlines = {selected: true, airline_name: airlines};
        } else {
            filters.airlines = {selected: false, airline_name: []};
        }
        this.setState({filters});
        this.filterItems();

    }

    handleStops(stops) {
        const {filters} = this.state;
        if (stops.length > 0) {
            filters.amount_of_stop = {selected: true, amount: stops};
        } else {
            filters.amount_of_stop = {selected: false, amount: []};
        }
        this.setState({filters});
        this.filterItems();

    }

    filterItems() {
        this.props.requestFilterFlights(this.state.filters);
    }

    render() {
        const {airlines, loading, stops} = this.props;
        const {flightNumber, max, min, segments, selectedAirlines} = this.state;
        return (
            <Fragment>
                {loading && <LoadingButton label="Cargando..."/>}
                <Row>
                    <Col sm={4}>
                        {airlines.length > 0 && (
                            <Fragment>
                                <h4>Airlines</h4>
                                <Airlines
                                    handleClick={airlinesSelected => this.handleAirlines(
                                        airlinesSelected
                                    )}
                                    airlines={airlines}
                                />
                            </Fragment>
                        )}
                        <h4>Flight Number</h4>
                        <FormControl
                            type="text"
                            value={flightNumber}
                            placeholder="Enter Flight Number"
                            onChange={e => this.filterItems(
                                selectedAirlines, e.target.value, max, min
                            )}
                        />
                        {stops && (
                            <Fragment>
                                <h4>Stops</h4>
                                <Stops
                                    handleClick={selectedStops => this.handleStops(selectedStops)}
                                    stops={stops}
                                />
                            </Fragment>
                        )}
                        <h4>Price Range</h4>
                        {/*
                        {priceRange && (
                            <PriceRange
                                priceRange={priceRange}
                                handleSubmit={(selectedMax, selectedMin) => this.handlePrices(selectedMax, selectedMin)}
                            />
                        )}
*/}
                    </Col>
                    <Col sm={8}>
                        {segments && segments.map(segment => {
                            const segmentProps = {segment};
                            return (
                                <Row key={segment.zid}>
                                    <Col sm={9} className="flights">
                                        <Segments {...segmentProps}/>
                                    </Col>
                                    {/*
                                    <Col sm={3}>
                                        {tripType !== 'oneWay' && (
                                            <Link to={`/details/${itinerarie.xid}`}>
                                                Seleccionar
                                            </Link>
                                        )}
                                    </Col>
*/}
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        airlines: state.flights.airlines,
        itineraries: state.flights.itineraries,
        loading: state.flights.loading,
        segments: state.flights.segments,
        stops: state.flights.stops
    }),
    dispatch => ({
        requestFlights: () => dispatch(requestFlights()),
        requestFilterFlights: filters => dispatch(
            requestFilterFlights(filters))
    })
)(Flights);
