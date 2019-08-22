/* global FileReader localStorage */
import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';

class Types extends PureComponent {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    };

    static defaultProps = {
        history: null
    };

    onChangeHandler = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            localStorage.setItem('dataJson', reader.result);
            this.props.history.push('/flights');
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    render() {
        return (
            <Fragment>
                <Row>
                    <Col sm={4}>
                        <input type="file" name="file" onChange={this.onChangeHandler}/>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Types;
