import React, {Component, Fragment} from "react";
import "../../css/ForgetPass.css";
import UserService from "../../services/UserService";
import {withRouter} from "react-router";
import SendEmailLink from "../utils/SendEmailLink";
import CustomSnackBar from "../utils/CustomSnackBar";

class VerifyEmail extends Component {

    constructor() {
        super();
        this.state = {
            alertShow: false,
            alertResponse: "",
            isEmailVerified: false,
            isVerificationEmailSent: false,
            loaded: false
        };
    }

    componentDidMount() {
        this.verifyEmail()
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
                {this.state.loaded !== false &&
                <SendEmailLink title="Verify Email"
                               subTitle="to verify your email" mainButtonName="Resend Email"
                               isVerificationLinkSend={this.state.isVerificationEmailSent}
                               isEmailVerified={this.state.isEmailVerified}
                               responseMessage={this.state.alertResponse}
                               sendData={this.sendVerificationEmail}/>
                }
            </Fragment>
        )
    };
}

export default withRouter(VerifyEmail)