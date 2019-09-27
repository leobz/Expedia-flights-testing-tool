import React, {useEffect, useState} from 'react';
import {remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import CheckboxInput from '../common';

const Airlines = ({airlines, handleClick}) => {
    const [selectedAirlines, setSelectedAirlines] = useState([]);

    useEffect(() => {
        setSelectedAirlines([]);
    }, [airlines]);

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
        <>
            {airlines && airlines.map(airline => (
                <Row key={airline.name}>
                    <Col sm={12}>
                        <CheckboxInput
                            label={`${airline.name} (${airline.amount})`}
                            value={airline.name}
                            handleClick={(a, selected) => handleChange(airline.name, selected)}
                        />
                    </Col>
                </Row>
            ))}
        </>
    );
};

Airlines.propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.shape).isRequired,
    handleClick: PropTypes.func.isRequired
};

export default Airlines;
