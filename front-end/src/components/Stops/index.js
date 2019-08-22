import React, {Fragment, PureComponent} from 'react';
import {keys, remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {CheckboxInput} from '../common';

class Stops extends PureComponent {
    static propTypes = {
        stops: PropTypes.shape().isRequired,
        handleClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
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
        const stopsKeys = keys(stops);
        return (
            <Fragment>
                {stopsKeys && stopsKeys.map(stop => (
                    <Row key={stop}>
                        <Col sm={12}>
                            <CheckboxInput
                                label={`${stop} (${stops[stop]})`}
                                value={stop}
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
