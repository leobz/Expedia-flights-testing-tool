import React, {useEffect, useState} from 'react';
import {clone} from 'lodash';
import PropTypes from 'prop-types';
import {
    Col,
    FormControl,
    FormGroup,
    Row
} from 'react-bootstrap';

const SplitInputComponent = ({data, label, handleClick}) => {
    const [max, setMax] = useState('');
    const [min, setMin] = useState('');
    const maxList = clone(data.available.sort().reverse());
    const minList = clone(data.available.sort());

    useEffect(() => {
        return handleClick(min, max);
    }, [max, min]);

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
                                    key={option}
                                    value={option}
                                >
                                    {option}
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

SplitInputComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default SplitInputComponent;
