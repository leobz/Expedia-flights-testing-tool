import React from 'react';
import {hot} from 'react-hot-loader';

import Main from './Main';

const App = () => (
    <fragment>
        <Main/>
    </fragment>
);

export default hot(module)(App);
