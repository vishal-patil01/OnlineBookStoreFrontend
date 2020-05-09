import React, {Component, Fragment} from "react";
import "../../css/Homepage.css";
import "../../css/CustomScrollbar.css";
import NavBarAdmin from "../../components/utils/NavigationBar";
import Grid from "@material-ui/core/Grid";
import Card from "./BookCard";
import Pagination from "@material-ui/lab/Pagination";
import {get} from "../../services/HttpService";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            bookList: [],
            pageValue: 0
        };
    }

    getBooks() {
        get(`book/${this.state.pageValue}/5`,)
            .then((response) => {
                console.log(response.data.bookList)
                this.setState({bookList: response.data.bookList});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.getBooks();
    }

    handleChange = (event, value) => {
        this.setState({pageValue: value - 1}, () => {
            this.getBooks()
        })
    }

    render() {
        return (
            <Fragment>
                <NavBarAdmin/>
                <div className="homePageContainer">
                    <Grid container spacing={3}>
                        {this.state.bookList.map(id =>
                            <Grid alignItems="center" key={id.id} item xs={12} sm={6} md={4} lg={3} xl={1}
                            >
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
                </div>
                <br/>
                <Grid container justify="center">
                    <Pagination count={Math.floor(this.state.count / 5)} variant="text" color="secondary"
                                onChange={this.handleChange}/>
                </Grid>
                <br/>
            </Fragment>
        );
    }
}

