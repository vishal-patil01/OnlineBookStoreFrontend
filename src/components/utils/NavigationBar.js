import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/NavigationBar.css'

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
                    <div className="search">
                        <div className="searchIcon">
                            <SearchIcon/>
                        </div>
                        <InputBase id="searchText"
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


