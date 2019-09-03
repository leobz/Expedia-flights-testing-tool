import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormGroup} from 'react-bootstrap';
import Airlines from '../Airlines';
import Stops from '../Stops';

const FilterPanel = ({
    airlines,
    flightNumbers,
    handleAirlinesClick,
    handleFlightNumber,
    handleStopsClick,
    stops
}) => {
    const handleChange = selectedAirlines => {
        handleAirlinesClick(selectedAirlines);
    };

    const handleStopsChange = selectedStops => {
        handleStopsClick(selectedStops);
    };

    return (
        <Fragment>
            <Fragment>
                <h4>Airlines</h4>
                <Airlines
                    handleClick={airlinesSelected => handleChange(
                        airlinesSelected
                    )}
                    airlines={airlines}
                />
            </Fragment>
            <Fragment>
                <h4>Stops</h4>
                <Stops
                    handleClick={selectedStops => handleStopsChange(selectedStops)}
                    stops={stops}
                />
            </Fragment>
            <Fragment>
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
            </Fragment>
        </Fragment>
    );
};

FilterPanel.propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.string).isRequired,
    flightNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleAirlinesClick: PropTypes.func.isRequired,
    handleFlightNumber: PropTypes.func.isRequired,
    handleStopsClick: PropTypes.func.isRequired,
    stops: PropTypes.shape().isRequired
};

export default FilterPanel;
