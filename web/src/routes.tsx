import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from './styles/pages/landing';
import Orphanage from './styles/pages/OrphanagesMap';

function Routes (){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Landing}/>
                <Route path="/app" component = {Orphanage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;