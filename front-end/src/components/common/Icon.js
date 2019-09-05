import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {isNil} from 'lodash';
import {childrenPropTypes, fontAwesomeIconPropTypes} from '../util';

const Icon = ({
    pullIconRight, icon, children
}) => (
    <fragment>
        {!pullIconRight && (
            <fragment>
                <FontAwesomeIcon
                    icon={icon}
                />
                {!isNil(children) ? <span>&nbsp;</span> : null}
            </fragment>
        )}
        {children}
        {pullIconRight && (
            <fragment>
                {!isNil(children) ? <span>&nbsp;</span> : null}
                <FontAwesomeIcon icon={icon}/>
            </fragment>
        )}
    </fragment>
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
