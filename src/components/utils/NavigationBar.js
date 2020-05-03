import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import {StylesProvider} from "@material-ui/core/styles";

export default class NavigationBar extends Component {
    render() {
        return (
            <StylesProvider injectFirst>
                <AppBar className="App-header">
                    <Toolbar >
                        <LocalLibraryIcon className="App-icon"/>
                        <Typography className="Headers-font">
                            Book Store
                        </Typography>
                    </Toolbar>
                </AppBar>
            </StylesProvider>
        );
    }
}


