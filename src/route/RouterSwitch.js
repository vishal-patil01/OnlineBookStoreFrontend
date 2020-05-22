import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import AddBook from "../components/admin/AddBook";
import HomePage from "../components/bookstore/HomePage";
import ForgetPassword from "../components/user/ForgetPassword";
import ResetPassword from "../components/user/ResetPassword";
import VerifyEmail from "../components/user/VerifyEmail";
import Variants from "../components/bookstore/test";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>

                    <Route path={"/admin"} exact component={AddBook}/>
                    <Route path={"/admin/books"} exact component={Variants}/>
                    <Route path={"/"} exact component={HomePage}/>
                    <Route path={"/display"} exact component={HomePage}/>
                    <Route path={"/forget/password"} exact component={ForgetPassword}/>
                    <Route path={"/reset/password"} exact component={ResetPassword}/>
                    <Route path={"/verify/email/"} exact component={VerifyEmail}/>
                </Switch>
            </BrowserRouter>

        );
    }
}