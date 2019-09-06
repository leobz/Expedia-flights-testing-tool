import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {isNil} from 'lodash';
import {childrenPropTypes, fontAwesomeIconPropTypes} from '../util';

const Icon = ({
    pullIconRight, icon, children
}) => (
    <>
        {!pullIconRight && (
            <>
                <FontAwesomeIcon
                    icon={icon}
                />
                {!isNil(children) ? <span>&nbsp;</span> : null}
            </>
        )}
        {children}
        {pullIconRight && (
            <>
                {!isNil(children) ? <span>&nbsp;</span> : null}
                <FontAwesomeIcon icon={icon}/>
            </>
        )}
    </>
);

Icon.propTypes = {
    icon: fontAwesomeIconPropTypes,
    pullIconRight: PropTypes.bool,
    children: childrenPropTypes
};

Icon.defaultProps = {
    icon: undefined,
    pullIconRight: false,
    children: undefined
};

export default Icon;
