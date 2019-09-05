import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import DevTools from './DevTools';

const Root = ({store, comp: Comp}) => (
    <Provider store={store}>
        <fragment>
            <DevTools/>
            <Comp/>
        </fragment>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
    comp: PropTypes.oneOfType([
        PropTypes.instanceOf(Component),
        PropTypes.func
    ]).isRequired
};

export default Root;
