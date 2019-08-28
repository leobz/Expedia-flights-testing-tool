import React, {Fragment, useState} from 'react';
import {keys, remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {CheckboxInput} from '../common';

const Stops = ({handleClick, stops}) => {
    const [selectedStops, setSelectedStops] = useState([]);

    const handleChange = (stop, selected) => {
        if (selected) {
            selectedStops.push(stop);
        } else {
            remove(selectedStops, s => s === stop);
        }
        setSelectedStops(selectedStops);
        handleClick(selectedStops);
    };

    const stopsKeys = keys(stops);

    return (
        <Fragment>
            {stopsKeys && stopsKeys.map(stop => (
                <Row key={stop}>
                    <Col sm={12}>
                        <CheckboxInput
                            label={`${stop} (${stops[stop]})`}
                            value={stop}
                            handleClick={(s, selected) => handleChange(s, selected)}
                        />
                    </Col>
                </Row>
            ))}
        </Fragment>
    );
};

Stops.propTypes = {
    stops: PropTypes.shape().isRequired,
    handleClick: PropTypes.func.isRequired
};

export default Stops;
