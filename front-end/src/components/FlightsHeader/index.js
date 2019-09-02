import React, {Fragment, useState} from 'react';
import {remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, FormControl, FormGroup, Row} from 'react-bootstrap';
import sortOptions from '../../constants';

const FlightHeader = ({flightsFound, handleSelect, sortType}) => {

    const handleChange = value => {
        handleSelect(value);
    };

    return (
        <Fragment>
            <Row>
                <Col sm={6}>
                    {`${flightsFound} flights found`}
                </Col>
                <Col sm={6} className="text-right">
                    <FormGroup controlId="formControlsSelect">
                        <FormControl
                            componentClass="select"
                            onChange={e => handleChange(e.target.value)}
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
        </Fragment>
    );
};

FlightHeader.propTypes = {
    flightsFound: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired,
    sortType: PropTypes.string.isRequired
};

export default FlightHeader;
