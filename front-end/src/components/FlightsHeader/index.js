import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Col,
    FormControl,
    FormGroup,
    Row
} from 'react-bootstrap';
import sortOptions from '../../constants';

const FlightHeader = ({
    flightsFound,
    handleSelect,
    selectedSegments,
    sortType
}) => (
    <fragment>
        {selectedSegments.length > 0 && (
            <fragment>
                <Row>
                    <Col sm={6}>
                        Selected Flights
                    </Col>
                </Row>
                <Row>
                    {selectedSegments.map(segment => (
                        <Col key={segment.zid} sm={4}>
                            {`${segment.from} - ${segment.to}`}
                            <br/>
                            {moment(segment.departure_time).format('ddd MMM D')}
                            <br/>
                            {`${segment.from} - ${moment(segment.departure_time).format('ddd MMM D hh:mm A')}`}
                            {` -> ${segment.to} ${moment(segment.arrival_time).format('ddd MMM D hh:mm A')}`}
                            <br/>
                            {`${segment.duration}, ${segment.stops} stops`}
                            <br/>
                            {segment.airlines.map(airline => <p>{airline}</p>)}
                        </Col>
                    ))}
                </Row>
            </fragment>
        )}
        <Row>
            <Col sm={6}>
                {`${flightsFound} flights found`}
            </Col>
            <Col sm={6} className="text-right">
                <FormGroup controlId="formControlsSelect">
                    <FormControl
                        componentClass="select"
                        onChange={e => handleSelect(e.target.value)}
                        placeholder="select"
                    >
                        {sortOptions.map(option => (
                            <option
                                key={option.sortKey}
                                value={option.sortKey}
                                selected={sortType === option.sortKey}
                            >
                                {option.text}
                            </option>
                        ))}
                    </FormControl>
                </FormGroup>
            </Col>
        </Row>
    </fragment>
);

FlightHeader.propTypes = {
    flightsFound: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired,
    selectedSegments: PropTypes.arrayOf(PropTypes.shape).isRequired,
    sortType: PropTypes.string.isRequired
};

export default FlightHeader;
