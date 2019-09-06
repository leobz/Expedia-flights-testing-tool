/* global FileReader localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';

const Types = ({history}) => {
    const onChangeHandler = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            localStorage.setItem('dataJson', reader.result);
            history.push('/flights');
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    return (
        <>
            <Row>
                <Col sm={4}>
                    <input type="file" name="file" onChange={onChangeHandler}/>
                </Col>
            </Row>
        </>
    );
};

Types.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

Types.defaultProps = {
    history: null
};

export default Types;
