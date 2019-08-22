import React from 'react';
import {Col, Row} from 'react-bootstrap';

const ErrorMessage = () => (
    <Row>
        <Col sm={12}>
            <h1>Lo sentimos</h1>
            <h3>Se produjo un error.</h3>
        </Col>
    </Row>
);

export default ErrorMessage;
