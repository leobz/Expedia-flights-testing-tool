import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {noop} from 'lodash';

import {childrenPropTypes, fontAwesomeIconPropTypes} from '../util';

import Icon from './Icon';

const IconButton = ({
    icon, pullIconRight, onClick, children
}) => (
    <Button
        onClick={onClick}
        bsStyle="primary"
        className="btn-group-justified"
        disabled
    >
        <Icon
            pullIconRight={pullIconRight}
            icon={icon}
        />
        {children}
    </Button>
);

IconButton.propTypes = {
    icon: fontAwesomeIconPropTypes,
    pullIconRight: PropTypes.bool,
    onClick: PropTypes.func,
    children: childrenPropTypes
};

IconButton.defaultProps = {
    icon: undefined,
    pullIconRight: false,
    onClick: noop,
    children: undefined
};

export default IconButton;
