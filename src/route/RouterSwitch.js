import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import AddBook from "../components/admin/AddBook";
import HomePage from "../components/bookstore/HomePage";
import VerifyEmail from "../components/user/VerifyEmail";
import Variants from "../components/bookstore/test";
import Dem from "../components/admin/Demotb";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>

                    <Route path={"/admin"} exact component={AddBook}/>
                    <Route path={"/admin/books"} exact component={Variants}/>
                    <Route path={"/"} exact component={HomePage}/>
                    <Route path={"/display"} exact component={HomePage}/>
                    <Route path={"/verify/email/"} exact component={VerifyEmail}/>
                    <Route path={"/admin/display/"} exact component={Dem}/>
                </Switch>
            </BrowserRouter>

        );
    }
}