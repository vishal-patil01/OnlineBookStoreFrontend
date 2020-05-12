import React, {Component, Fragment} from "react";
import "../../css/HomePage.css";
import "../../css/scrollbar.css";
import Grid from "@material-ui/core/Grid";
import Book from "./Book";
import Pagination from "@material-ui/lab/Pagination";
import NavigationBar from "../utils/NavigationBar";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import BookStoreService from "../../services/BookStoreService";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            bookList: [],
            count: 0,
            pageValue: 1,
            searchText: " ",
            selectValue: "",
        };
    }


    getBooks = () => {
        new BookStoreService().fetchBooks(this.state.pageValue, this.state.searchText, this.state.selectValue)
            .then((response) => {
                    console.log("fetchbook")
                    console.log(response);
                    response.data.statusCode === 208 ?
                        this.setState({
                            bookList: [],
                            count: 0,
                        }) :
                        this.setState({
                            bookList: response.data.data.content,
                            count: response.data.data.totalElements,
                        });
                }
            )
            .catch((error) => {
                console.log(error)
            });
        setTimeout(() => {
            this.setState({
                loaded: true
            });

        }, 2000)
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getBooks();
    }

    onPageChange = (event, value) => {
        this.setState({pageValue: value,}, () => {
            this.getBooks()
        });
        this.handleChange(this.state.selectValue)
    };

    getSearchFieldTextValue = (text) => {
        this.setState({searchText: text, pageValue: 1}, () => this.getBooks())
    };

    handleChange = (value) => {
        this.setState({
            selectValue: value,
        }, () => this.getBooks())
    };


    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#b90f4b',
                },
            },
        });
        return (
            <Fragment>

                <NavigationBar searchedText={this.getSearchFieldTextValue}/>
                <Container id="homePageContainer">
                    <div className="BooksCountSortFieldDiv">
                        <p>Books <span>({this.state.count} items) </span></p>
                        <ThemeProvider theme={theme}>
                            {this.state.count === 0 ?
                                <div>
                                </div> :
                                <Select id="sortField"
                                        native
                                        className="select-filter"
                                        variant="outlined"
                                        onChange={event => this.handleChange(event.target.value)}>
                                    <option value={"DEFAULT"}>Filter</option>
                                    <option value={"LOW_TO_HIGH"}>Price : Low To High</option>
                                    <option value={"HIGH_TO_LOW"}>Price : High To Low</option>
                                    <option value={"NEW_ARRIVALS"}>New Arrival</option>
                                </Select>
                            }
                        </ThemeProvider>
                    </div>
                    <div className="resultNotFound">
                        <img src={require(`../../assets/uploads/noResult.png`)} alt="No Result Found"
                             width="300px" height="200px"/>
                        <h2>Sorry, no results found!</h2>
                    </div>
                    }

                    <Grid container spacing={4}>
                        {this.state.bookList.map(id =>
                            <Grid alignItems="center" key={id.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Book
                                    bookId={id}
                                />
                            </Grid>
                        )}

                    </Grid>
                    }
                    <br/>
                </Container>
                <Grid container justify={"center"}>
                    <Pagination size="small" count={Math.ceil(this.state.count / 12)} variant="text" color="secondary"
                                onChange={this.onPageChange}/>
                </Grid>
                <br/>
            </Fragment>
        );
    }
}

