import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormGroup
} from 'react-bootstrap';

const InputComponent = ({data, handleClick}) => (
    <>
        <FormGroup controlId="formControlsSelect">
            <FormControl
                componentClass="select"
                onChange={e => handleClick(e.target.value)}
                placeholder="select"
            >
                <option value="">Select flight number</option>
                {data.map(option => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </FormControl>
        </FormGroup>
    </>
);

InputComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleClick: PropTypes.func.isRequired
};

export default InputComponent;
