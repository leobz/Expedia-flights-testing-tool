import React, {useEffect, useState} from 'react';
import {map, parseInt, sortBy} from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Col,
    FormControl,
    FormGroup,
    Row
} from 'react-bootstrap';

const SplitInputComponent = ({data, label, handleClick}) => {
    const [max, setMax] = useState('');
    const [min, setMin] = useState('');

    let maxList;
    let minList;

    if (label === 'Duration') {
        minList = sortBy(map(data.available, d => ({label: d, sort: moment.duration(d), value: d})), m => m.sort);
        maxList = sortBy(map(data.available, d => (
            {label: d, sort: moment.duration(d), value: d}
        )), m => m.label).reverse();
    } else if (label === 'Price') {
        minList = sortBy(map(data.available, d => ({label: d / 100, sort: parseInt(d), value: d})), m => m.label);
        maxList = sortBy(map(data.available, d => (
            {label: d / 100, sort: parseInt(d), value: d}
        )), m => m.label).reverse();
    }

    useEffect(() => handleClick(min, max), [max, min]);

    useEffect(() => {
        setMax('');
        setMin('');
    }, [data]);

    return (
        <>
            <Row>
                <FormGroup controlId="formControlsSelect">
                    <Col sm={6}>
                        {`Min ${label}`}
                        <FormControl
                            componentClass="select"
                            onChange={e => setMin(e.target.value)}
                            placeholder="select"
                        >
                            <option value="">{`Select min ${label}`}</option>
                            {minList.map(option => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </FormControl>
                    </Col>
                    <Col sm={6}>
                        {`Max ${label}`}
                        <FormControl
                            componentClass="select"
                            onChange={e => setMax(e.target.value)}
                            placeholder="select"
                        >
                            <option value="">{`Select max ${label}`}</option>
                            {maxList.map(option => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </FormControl>
                    </Col>
                </FormGroup>
            </Row>
        </>
    );
};

SplitInputComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default SplitInputComponent;
