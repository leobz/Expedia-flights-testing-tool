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
        airlines: PropTypes.shape({}),
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
            min: PropTypes.number,
        }).isRequired,
        requestFlights: PropTypes.func.isRequired,
        requestFilterFlights: PropTypes.func.isRequired,
        segments: PropTypes.shape({}),
        step: PropTypes.number
    };

    static defaultProps = {
        airlines: {},
        history: null,
        itineraries: [],
        segments: {},
        step: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            flightNumber: '',
            itineraries: [],
            max: 0,
            min: 0,
            selectedAirlines: [],
            stops: []
        };
    }

    componentDidMount() {
        this.props.requestFlights(this.props.match.params.tripType);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itineraries !== this.props.itineraries) {
            this.updateState(this.props.itineraries);
        }
    }

    updateState(itineraries) {
        this.setState({itineraries});
    }

    findSegment(segmentId) {
        const {segments} = this.props;
        return segments[segmentId];
    }

    handlePrices(max, min) {
        const {selectedAirlines, flightNumber, stops} = this.state;
        this.setState({max, min});
        this.filterItems(
            selectedAirlines,
            flightNumber,
            this.props.step,
            stops,
            max,
            min
        );
    }

    filterItems(airlines, flightNumber = '', step = 0, stops = 0, max = 0, min = 0) {
        this.setState({selectedAirlines: airlines, flightNumber, stops});
        this.props.requestFilterFlights(
            airlines,
            flightNumber,
            step,
            this.props.match.params.tripType,
            stops,
            max,
            min
        );
    }

    render() {
        const {airlines, loading, priceRange, step} = this.props;
        const {tripType} = this.props.match.params;
        const {flightNumber, itineraries, max, min, selectedAirlines, stops} = this.state;
        return (
            <Fragment>
                {loading && <LoadingButton label="Cargando..."/>}
                <Row>
                    <Col sm={4}>
                        {airlines && (
                            <Fragment>
                                <h4>Airlines</h4>
                                <Airlines
                                    handleClick={airlinesSelected => this.filterItems(
                                        airlinesSelected, flightNumber, step, stops, max, min
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
                                selectedAirlines, e.target.value, step, stops, max, min
                            )}
                        />
                        <h4>Stops</h4>
                        <Stops
                            handleClick={selectedStops => this.filterItems(
                                selectedAirlines, flightNumber, step, selectedStops, max, min
                            )}
                        />
                        <h4>Price Range</h4>
                        {priceRange && (
                            <PriceRange
                                priceRange={priceRange}
                                handleSubmit={(selectedMax, selectedMin) => this.handlePrices(selectedMax, selectedMin)}
                            />
                        )}
                    </Col>
                    <Col sm={8}>
                        {itineraries && itineraries.map(itinerarie => {
                            const segmentProps = {
                                airlines,
                                price: itinerarie.pricing_information.total_price.cents / 100,
                                segment: this.findSegment(itinerarie.segment_ids[0])
                            };
                            return (
                                <Row key={itinerarie.xid}>
                                    <Col sm={9} className="flights">
                                        <Segments {...segmentProps}/>
                                    </Col>
                                    <Col sm={3}>
                                        {tripType !== 'oneWay' && (
                                            <Link to={`/details/${itinerarie.xid}`}>
                                                Seleccionar
                                            </Link>
                                        )}
                                    </Col>
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
        priceRange: state.flights.priceRange,
        segments: state.flights.segments
    }),
    dispatch => ({
        requestFlights: (tripType, step) => dispatch(requestFlights(tripType, step)),
        requestFilterFlights: (airlines, flightNumber, step, tripType, stops, max, min) => dispatch(
            requestFilterFlights(airlines, flightNumber, step, tripType, stops, max, min
            ))
    })
)(Flights);
