import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Col, Row} from 'react-bootstrap';

class Editor extends PureComponent {
    static propTypes = {
        product: PropTypes.shape({
            enabled: PropTypes.bool,
            _id: PropTypes.string
        }).isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.product.enabled
        };
    }

    handleCheck(e) {
        this.setState(() => ({checked: e.checked}));
        this.props.onChange(this.props.product._id, e.checked);
    }

    render() {
        const {product} = this.props;
        return (
            <Row>
                <Col sm={2}>{product._id}</Col>
                <Col sm={6}>{product.description}</Col>
                <Col sm={2}>
                    <Checkbox
                        onChange={e => this.handleCheck(e.target)}
                        checked={this.state.checked}
                    />
                </Col>
            </Row>
        );
    }
}

export default Editor;
