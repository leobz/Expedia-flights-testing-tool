import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Row} from 'react-bootstrap';

const Segments = ({
    itinerariesSize,
    handleClick,
    segment,
    segmentsId
}) => (
    <fragment>
        <Row>
            <Col sm={3}>
                {segment.departure_time}
                -
                {segment.arrival_time}
            </Col>
            <Col sm={3}>
                {`Duration: ${segment.duration}`}
            </Col>
            <Col sm={3}>
                {`Stops: ${segment.stops}`}
            </Col>
            <Col sm={3}>
                {`Price: ${segment.price / 100}`}
            </Col>
        </Row>
        <Row>
            <Col sm={3}>
                {`From: ${segment.from}`}
            </Col>
            <Col sm={3}>
                {`To: ${segment.to}`}
            </Col>
            {itinerariesSize > (segmentsId.length + 1) && (
                <Col sm={6} className="text-right">
                    <Button onClick={() => handleClick(segment.zid)} bsStyle="primary">Select</Button>
                </Col>
            )}
        </Row>
    </fragment>
);

Segments.propTypes = {
    itinerariesSize: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    segment: PropTypes.shape({
        arrival_time: PropTypes.string,
        departure_time: PropTypes.string,
        duration: PropTypes.string,
        from: PropTypes.string,
        price: PropTypes.number,
        stops: PropTypes.number,
        to: PropTypes.string,
        zid: PropTypes.string
    }).isRequired,
    segmentsId: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Segments;
