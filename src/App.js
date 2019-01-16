import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/404';
import NavBar from './components/partials/navbar';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/404" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/404" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
