import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import AddBook from "../components/admin/AddBook";
import Homepage from "../components/user/Homepage";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/admin"} exact component={AddBook}/>
                    <Route path={"/"} exact component={Homepage}/>
                </Switch>
            </BrowserRouter>

        );
    }
}