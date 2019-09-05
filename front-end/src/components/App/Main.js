import {HashRouter, Route, Switch} from 'react-router-dom';
import React from 'react';

import ErrorMessage from '../common/ErrorMessage';
import Footer from './Footer';
import Header from './Header';
import Flights from '../Flights';
import Types from '../Types';

const MainRoutes = () => (
    <HashRouter>
        <fragment>
            <Header/>
            <main>
                <Switch>
                    <Route exact path="/" component={Types}/>
                    <Route exact path="/flights" component={Flights}/>
                    <Route component={ErrorMessage}/>
                </Switch>
            </main>
            <Footer/>
        </fragment>
    </HashRouter>
);

export default MainRoutes;
