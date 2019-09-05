import React from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

const Footer = () => (
    <footer className="hidden-print">
        <Grid>
            <Row>
                <Col sm={6}>
                    <span/>
                    <div className="version">
                        Version&nbsp;
                        {VERSION}
                    </div>
                </Col>
            </Row>
        </Grid>
    </footer>
);

export default Footer;
