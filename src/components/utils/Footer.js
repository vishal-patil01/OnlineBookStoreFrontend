import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import {StylesProvider} from "@material-ui/core/styles";

export default class Footer extends Component {
    render() {
        return (
            <StylesProvider injectFirst>
                <footer className="footer">
                    <Typography className="footer-font">
                        &copy; Copyright {new Date().getFullYear()} - {new Date().getFullYear() + 1} , The Book Store
                        Pvt
                        Ltd.
                    </Typography>
                </footer>
            </StylesProvider>
        );
    }
}

