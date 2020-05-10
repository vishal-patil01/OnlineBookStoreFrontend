import React, {Component, Fragment} from "react";
import "../../css/Homepage.css";
import "../../css/CustomScrollbar.css";
import Grid from "@material-ui/core/Grid";
import Card from "./BookCard";
import Pagination from "@material-ui/lab/Pagination";
import {get} from "../../services/HttpService";
import NavigationBar from "../utils/NavigationBar";
import Container from "@material-ui/core/Container";

import TextField from "@material-ui/core/TextField";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            bookList: [],
            count: 0,
            pageValue: 0,
            searchText: "",
        };
    }

    getBooks() {
        get(`book/${this.state.pageValue}/8`,)
            .then((response) => {
                console.log(response.data.bookList)
                this.setState({
                    bookList: response.data.bookList,
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getTotalBooksCount() {
        get('count')
            .then((response) => {
                console.log(response.data)
                this.setState({
                    count: response.data,
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.getBooks();
        this.getTotalBooksCount();
    }

    onPageChange = (event, value) => {
        this.setState({pageValue: value - 1}, () => {
            this.getBooks()
        })
    }

    render() {
        return (
            <Fragment>
                <NavigationBar searchedText={this.getSearchFieldTextValue}/>
                <Container id="homePageContainer">
                    <div className="secondaryHeader">
                        <p className="secondaryHeader-main-font">Books <span
                            className="subHeader">({this.state.count} items) </span></p>
                    </div>
                    <Grid container spacing={4}>
                        {this.state.bookList.map(id =>
                            <Grid alignItems="center" key={id.id} item xs={12} sm={6} md={4} lg={3} xl={1}>
                                <Card
                                    key={id.id}
                                    bookName={id.bookName}
                                    authorName={id.authorName}
                                    bookPrice={id.bookPrice}
                                    image={id.bookImageSrc}
                                    bookDetails={id.bookDetail}
                                    noOfCopies={id.noOfCopies}/>
                            </Grid>
                        )}
                    </Grid>
                    <br/>
                </Container>
                <Grid container justify={"center"}>
                    <Pagination count={Math.round(this.state.count / 8)} variant="text" color="secondary"
                                onChange={this.onPageChange}/>
                </Grid>
            </Fragment>
        );
    }
}

