import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'react-bootstrap';

class CheckboxInput extends PureComponent {
    static propTypes = {
        handleClick: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.number, PropTypes.string
        ]).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {checkboxChecked: false};
    }

    handleChange(e) {
        const {checkboxChecked} = this.state;
        this.props.handleClick(e.value, !checkboxChecked);
        this.setState({checkboxChecked: !checkboxChecked});
    }

    render() {
        const {label, value} = this.props;
        const {checkboxChecked} = this.state;
        return (
            <Checkbox onChange={e => this.handleChange(e.target)} value={value} checked={checkboxChecked}>
                {label}
            </Checkbox>
        );
    }
}

export default CheckboxInput;
