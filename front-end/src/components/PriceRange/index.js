import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, FormControl, Row} from 'react-bootstrap';

class PriceRange extends PureComponent {
    static propTypes = {
        priceRange: PropTypes.shape().isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            max: 0,
            min: 0
        };
    }

    componentDidMount() {
        this.updateState(this.props.priceRange);
    }

    updateState(priceRange) {
        this.setState({max: priceRange.max / 100, min: priceRange.min / 100});
    }

    handleChange(max, min) {
        this.setState({max, min});
    }

    submit() {
        const {max, min} = this.state;
        this.props.handleSubmit(max, min);
    }

    render() {
        const {max, min} = this.state;
        return (
            <Row>
                <Col sm={6}>
                    <FormControl
                        type="number"
                        min={min}
                        max={max}
                        value={min}
                        onChange={e => this.handleChange(max, e.target.value)}
                    />
                    <FormControl
                        type="number"
                        min={min}
                        max={max}
                        value={max}
                        onChange={e => this.handleChange(e.target.value, min)}
                    />
                    <Button onClick={() => this.submit()} bsStyle="primary">Send</Button>
                </Col>
            </Row>
        );
    }
}

export default PriceRange;
