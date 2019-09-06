import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {clone, filter} from 'lodash';
import {Col, FormControl, FormGroup, Row} from 'react-bootstrap';
import Airlines from '../Airlines';
import Stops from '../Stops';

const FilterPanel = ({
    airlines,
    duration,
    flightNumbers,
    handleAirlinesClick,
    handleDuration,
    handleFlightNumber,
    handleStopsClick,
    stops
}) => {
    const [maxDuration, setMaxDuration] = useState(duration.max);
    const [minDuration, setMinDuration] = useState(duration.min);
    const maxList = clone(duration.available.sort().reverse());
    const minList = clone(duration.available.sort());
    const [maxDurationList, setMaxDurationList] = useState(maxList);
    const [minDurationList, setMinDurationList] = useState(minList);

    const filterMinAndMaxDurations = () => {
        setMaxDurationList(filter(maxList, d => d >= minDuration));
        setMinDurationList(filter(minList, d => d <= maxDuration));
        return handleDuration(minDuration, maxDuration);
    };

    useEffect(() => {
        filterMinAndMaxDurations();
    }, [maxDuration, minDuration]);

    const handleChange = selectedAirlines => {
        handleAirlinesClick(selectedAirlines);
    };

    const handleStopsChange = selectedStops => {
        handleStopsClick(selectedStops);
    };

    const handleDurationRange = (type, value) => {
        if (type === 'max') {
            setMaxDuration(value);
        }
        setMinDuration(value);
    };

    return (
        <>
            <h4>Airlines</h4>
            <Airlines
                handleClick={airlinesSelected => handleChange(
                    airlinesSelected
                )}
                airlines={airlines}
            />
            <h4>Stops</h4>
            <Stops
                handleClick={selectedStops => handleStopsChange(selectedStops)}
                stops={stops}
            />
            <h4>Flight Number</h4>
            <FormGroup controlId="formControlsSelect">
                <FormControl
                    componentClass="select"
                    onChange={e => handleFlightNumber(e.target.value)}
                    placeholder="select"
                >
                    <option value="">Select flight number</option>
                    {flightNumbers.map(option => (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}
                </FormControl>
            </FormGroup>
            <h4>Duration</h4>
            <Row>
                <FormGroup controlId="formControlsSelect">
                    <Col sm={6}>
                        Min duration
                        <FormControl
                            componentClass="select"
                            onChange={e => handleDurationRange('min', e.target.value)}
                            placeholder="select"
                        >
                            {minDurationList.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </FormControl>
                    </Col>
                    <Col sm={6}>
                        Max duration
                        <FormControl
                            componentClass="select"
                            onChange={e => handleDurationRange('max', e.target.value)}
                            placeholder="select"
                        >
                            {maxDurationList.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </FormControl>
                    </Col>
                </FormGroup>
            </Row>
        </>
    );
};

FilterPanel.propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.shape).isRequired,
    duration: PropTypes.shape({
        available: PropTypes.arrayOf(PropTypes.string),
        max: PropTypes.string,
        min: PropTypes.string
    }).isRequired,
    flightNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleAirlinesClick: PropTypes.func.isRequired,
    handleDuration: PropTypes.func.isRequired,
    handleFlightNumber: PropTypes.func.isRequired,
    handleStopsClick: PropTypes.func.isRequired,
    stops: PropTypes.shape().isRequired
};

export default FilterPanel;
