import React, {Fragment, useState} from 'react';
import {remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {CheckboxInput} from '../common';

const Airlines = ({airlines, handleClick}) => {
    const [selectedAirlines, setSelectedAirlines] = useState([]);

    const handleChange = (airline, selected) => {
        if (selected) {
            selectedAirlines.push(airline);
        } else {
            remove(selectedAirlines, a => a === airline);
        }
        setSelectedAirlines(selectedAirlines);
        handleClick(selectedAirlines);
    };

    return (
        <Fragment>
            {airlines && airlines.map(airline => (
                <Row key={airline}>
                    <Col sm={12}>
                        <CheckboxInput
                            label={airline}
                            value={airline}
                            handleClick={(a, selected) => handleChange(airline, selected)}
                        />
                    </Col>
                </Row>
            ))}
        </Fragment>
    );
};

Airlines.propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleClick: PropTypes.func.isRequired
};

export default Airlines;
