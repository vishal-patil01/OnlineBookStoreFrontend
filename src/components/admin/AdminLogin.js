import React, {Component, Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import Signin from "../user/Signin";
import "../../css/AdminLogin.css";
import Card from "@material-ui/core/Card";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: "",
            severity: "",
            alertShow: "",
            alertResponse: "",
        }
    }

    componentDidMount() {
        document.getElementsByClassName('mainDiv')[0].style.minHeight = "73vh";
    }

    showAlert = (severity, alertShow, alertResponse) => {
        this.setState({
            severity: severity,
            alertShow: alertShow,
            alertResponse: alertResponse
        })
    }
    handlePasswordVisibility = (obj) => {
        obj = document.getElementById('password');
        if (obj.type === "password") {
            obj.type = "text";
            this.setState({
                isVisible: true,
            });
        } else {
            obj.type = "password";
            this.setState({
                isVisible: false,
            });
        }
    };

    render() {
        return (
            <Fragment>
                <NavigationBar/>
                <Card className="adminLogin">
                    <div className="adminLabel">Admin Login</div>
                    <div className="adminSignUp">
                        <Signin showAlert={this.showAlert} isVisible={this.state.isVisible}
                                handlePasswordVisibility={this.handlePasswordVisibility}/>
                    </div>
                </Card>
            </Fragment>
        )
    }
}

export default AdminLogin;