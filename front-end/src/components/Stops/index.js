import React, {Fragment, PureComponent} from 'react';
import {remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {CheckboxInput} from '../common';

class Stops extends PureComponent {
    static propTypes = {
        stops: PropTypes.arrayOf([{
            label: PropTypes.string,
            value: PropTypes.number
        }]),
        handleClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        stops: [{
            label: '0 stop',
            value: 1
        }, {
            label: '1 stop',
            value: 2
        }, {
            label: '2+ stops',
            value: 3
        }]
    };

    constructor() {
        super();
        this.state = {selectedStops: []};
    }

    handleChange(stop, selected) {
        const {selectedStops} = this.state;
        if (selected) {
            selectedStops.push(stop);
        } else {
            remove(selectedStops, s => s === stop);
        }
        this.setState({selectedStops});
        this.props.handleClick(this.state.selectedStops);
    }

    render() {
        const {stops} = this.props;
        return (
            <Fragment>
                {stops && stops.map(stop => (
                    <Row key={stop.value}>
                        <Col sm={12}>
                            <CheckboxInput
                                label={stop.label}
                                value={stop.value}
                                handleClick={(s, selected) => this.handleChange(s, selected)}
                            />
                        </Col>
                    </Row>
                ))}
            </Fragment>
        );
    }
}

export default Stops;
