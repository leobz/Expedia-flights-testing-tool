import React, {Fragment, PureComponent} from 'react';
import {keys, remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {CheckboxInput} from '../common';

class Airlines extends PureComponent {
    static propTypes = {
        airlines: PropTypes.arrayOf(PropTypes.string).isRequired,
        handleClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {selectedAirlines: []};
    }

    handleChange(airline, selected) {
        const {selectedAirlines} = this.state;
        if (selected) {
            selectedAirlines.push(airline);
        } else {
            remove(selectedAirlines, a => a === airline);
        }
        this.setState({selectedAirlines});
        this.props.handleClick(this.state.selectedAirlines);
    }

    render() {
        const {airlines} = this.props;
        return (
            <Fragment>
                {airlines && airlines.map(airline => (
                    <Row key={airline}>
                        <Col sm={12}>
                            <CheckboxInput
                                label={airline}
                                value={airline}
                                handleClick={(a, selected) => this.handleChange(airline, selected)}
                            />
                        </Col>
                    </Row>
                ))}
            </Fragment>
        );
    }
}

export default Airlines;
