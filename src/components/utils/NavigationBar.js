import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/NavigationBar.css'
import {Link} from "react-router-dom";
import DialogBoxPage from "./CustomDialogBox";
import {withRouter} from "react-router";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogBoxVisible: false,
            url: "",
        };
    }

    handleClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
    };

    returnSearchTextValue = (searchText) => {
        this.props.searchedText(searchText)
    };

    render() {
        const urlPath = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

        return (
            <AppBar id="App-header">
                <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible} close={this.handleClose}/>
                <Toolbar id="toolbar">
                    <LocalLibraryIcon id="App-icon"/>
                    <Link style={{color: 'white', textDecoration: 'none'}} to={'/'}>
                        <Typography id="Headers-font">
                            e BookStore
                        </Typography>
                    </Link>
                    <div className="search"
                         style={urlPath === '' ? {visibility: "visible"} : {visibility: "hidden"}}>
                        <div className="searchIcon">
                            <SearchIcon/>
                        </div>
                        <InputBase fullWidth
                                   id="searchText"
                                   placeholder=" Search"
                                   className="inputRoot inputInput"
                                   inputProps={{'aria-label': 'search'}}
                                   onChange={(event) => this.returnSearchTextValue(event.target.value)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(NavigationBar);