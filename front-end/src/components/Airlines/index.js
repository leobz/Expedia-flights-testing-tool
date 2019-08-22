import React, {Fragment, PureComponent} from 'react';
import {keys, remove} from 'lodash';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {CheckboxInput} from '../common';

class Airlines extends PureComponent {
    static propTypes = {
        airlines: PropTypes.shape().isRequired,
        handleClick: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {selectedAirlines: []};
    }

    formatAirlines(airlines) {
        return keys(airlines);
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
                {airlines && this.formatAirlines(airlines).map(a => (
                    <Row key={a}>
                        <Col sm={12}>
                            <CheckboxInput
                                label={`${airlines[a].name} (${airlines[a].count})`}
                                value={airlines[a].code}
                                handleClick={(airline, selected) => this.handleChange(airline, selected)}
                            />
                        </Col>
                    </Row>
                ))}
            </Fragment>
        );
    }
}

export default Airlines;
