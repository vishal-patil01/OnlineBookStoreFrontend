import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import AddBook from "../components/admin/AddBook";
import Variants from "../components/bookstore/test";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>

                    <Route path={"/admin"} exact component={AddBook}/>
                    <Route path={"/admin/books"} exact component={Variants}/>
                </Switch>
            </BrowserRouter>

        );
    }
}