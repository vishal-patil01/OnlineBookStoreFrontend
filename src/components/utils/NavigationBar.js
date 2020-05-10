import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/NavigationBar.css'
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

export default class NavigationBar extends Component {

    returnSearchTextValue = (searchText) => {
        this.props.searchedText(searchText)
    }

    render() {
        return (
            <AppBar id="App-header">
                <Toolbar>
                    <LocalLibraryIcon className="App-icon"/>
                    <Typography className="Headers-font">
                        Book Store
                    </Typography>
                </Toolbar>
            </AppBar>

        );
    }
}


