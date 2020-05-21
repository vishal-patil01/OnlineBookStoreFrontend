import React, {Component, Fragment} from "react";
import "../../css/ForgetPass.css";
import UserService from "../../services/UserService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {Redirect} from "react-router";
import SendEmailLink from "../utils/SendEmailLink";
import CustomSnackBar from "../utils/CustomSnackBar";

export default class verifyEmail extends Component {

    constructor() {
        super();
        this.state = {
            alertShow: false,
            alertResponse: "",
            responseStatus: false,
            isVerificationEmailSent: false
        };
    }


    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    render() {
        return (
            <Fragment>
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                <SendEmailLink title="Forget Password " subTitle="to reset your password" mainButtonName="Resend Email"
                               sendData={this.sendResetPasswordLink}
                               isVerificationLinkSend={this.state.isVerificationEmailSent}
                               responseMessage="Reset Password Link Has Been Sent"
                               isVerified={false}
                />
            </Fragment>
        )
    };
}
