import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';

class Segments extends PureComponent {
    static propTypes = {
        airlines: PropTypes.shape({}).isRequired,
        price: PropTypes.number.isRequired,
        segment: PropTypes.shape({
            duration: PropTypes.string,
            legs: PropTypes.arrayOf({})
        }).isRequired
    };

    render() {
        const {airlines, price, segment} = this.props;
        return (
            <Fragment>
                <Row>
                    <Col sm={4}>
                        Price: {price}
                    </Col>
                    <Col sm={4}>
                        Duration: {segment.duration}
                    </Col>
                    <Col sm={4}>
                        Hora de salida: {segment.legs[0].flight_time_range.from}
                    </Col>
                </Row>
                {segment.legs.map(leg => (
                    <Row key={leg.zid}>
                        <Col sm={3}>
                            Desde: {leg.departure_airport_id}
                        </Col>
                        <Col sm={3}>
                            Hasta: {leg.arrival_airport_id}
                        </Col>
                        <Col sm={3}>
                            FN: {leg.flight_number}
                        </Col>
                        <Col sm={3}>
                            Airline: {airlines[leg.marketing_airline_code].name}
                        </Col>
                    </Row>
                ))}
            </Fragment>
        );
    }
}

export default Segments;
