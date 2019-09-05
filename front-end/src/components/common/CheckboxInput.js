import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'react-bootstrap';

const CheckboxInput = ({handleClick, label, value}) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const handleChange = e => {
        handleClick(e.value, !checkboxChecked);
        setCheckboxChecked(!checkboxChecked);
    };

    return (
        <Checkbox onChange={e => handleChange(e.target)} value={value} checked={checkboxChecked}>
            {label}
        </Checkbox>
    );
};

CheckboxInput.propTypes = {
    handleClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string
    ]).isRequired
};

export default CheckboxInput;
