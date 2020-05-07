import React, {Fragment} from 'react';
import "../../css/AddBook.css"
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import TextField from '@material-ui/core/TextField'
import {post} from "../../services/HttpService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {StylesProvider} from "@material-ui/core/styles";
import AdminHeader from "./Header";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isbnNumber: "",
            bookName: "",
            authorName: "",
            bookDetails: "",
            noOfCopies: "",
            bookPrice: "",
            publishingYear: "",
            bookImageSrc: "",

            isbnNumberError: " ",
            bookNameError: " ",
            authorNameError: " ",
            bookPriceError: " ",
            noOfCopiesError: " ",
            bookDetailsError: " ",
            publishingYearError: " ",
            bookImageError: " ",

            alertShow: false,
            alertResponse: "",

            requiredFieldCheck: "",
        };
    }

    validation = (event, pattern, errorMessage) => {
        if (event.target.value.match(pattern)) {
            this.setState({
                [event.target.id + "Error"]: " ",
                tempName: event.target.id,
            })
            if (!this.state.requiredFieldCheck.includes(event.target.name.charAt(0))) {
                this.setState({requiredFieldCheck: this.state.requiredFieldCheck + event.target.name.charAt(0)})
            }
        } else {
            this.setState({
                [event.target.id + "Error"]: errorMessage
            })
            if (this.state.requiredFieldCheck.includes(event.target.name.charAt(0))) {
                this.setState({requiredFieldCheck: this.state.requiredFieldCheck.replace(event.target.name.charAt(0), "")})
            }
        }
    }
    addBook = () => {
        const book = {
            isbnNumber: this.state.isbnNumber,
            bookName: this.state.bookName,
            authorName: this.state.authorName,
            bookPrice: this.state.bookPrice,
            noOfCopies: this.state.noOfCopies,
            bookDetails: this.state.bookDetails,
            bookImageSrc: this.state.bookImageSrc,
            publishingYear: this.state.publishingYear
        }
        console.log("book ", book)
        post(book, "admin/addbook").then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                this.setState({
                    severity: "success",
                    alertShow: true,
                    alertResponse: response.data.message
                });
                this.clearFieldsData();
            } else {
                this.setState({
                    severity: "error",
                    alertShow: true,
                    alertResponse: response.data.message
                });
            }
        });
    }

    handleChange = ({target}) => {
        this.setState({[target.id]: target.value});
    };

    clearFieldsData = () => {
        this.setState({
            isbnNumber: "",
            bookName: "",
            authorName: "",
            bookPrice: "",
            noOfCopies: "",
            bookDetail: "",
            bookImageSrc: "",
            publishingYear: "",
        });
    };
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    render() {
        return (
            <Fragment>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={this.state.alertShow}
                          autoHideDuration={6000} onClose={this.closeAlertBox}>
                    <Alert onClose={this.closeAlertBox} severity={this.state.severity} variant={"filled"}>
                        {this.state.alertResponse}
                    </Alert>
                </Snackbar>
                <AdminHeader/>
                <Container className="container">
                    <StylesProvider injectFirst>
                        <Card className="card">
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h3>
                                            Book Details
                                        </h3>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="bookName" label="Book Name" onChange={this.handleChange}
                                                   name="Book Name"
                                                   value={this.state.bookName}
                                                   variant="outlined"
                                                   fullWidth
                                                   size="small"
                                                   onBlur={event => this.validation(event, "^.{3,}$", "Enter Minimum 3 Characters")}
                                                   error={this.state.bookNameError.trim().length !== 0}
                                                   helperText={this.state.bookNameError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="authorName" label="Author Name" onChange={this.handleChange}
                                                   name="Author Name"
                                                   size="small"
                                                   value={this.state.authorName}
                                                   variant="outlined"
                                                   fullWidth
                                                   onBlur={event => this.validation(event, "^[A-za-z]{1}[A-Za-z .]{2,}$", "Enter Minimum 3 Characters(Only Alphabets)")}
                                                   error={this.state.authorNameError.trim().length !== 0}
                                                   helperText={this.state.authorNameError}
                                                   required/>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4}>
                                        <TextField id="isbnNumber" label="ISBN" onChange={this.handleChange}
                                                   name="ISBN" value={this.state.isbnNumber} variant="outlined"
                                                   fullWidth
                                                   size="small"
                                                   onFocus
                                                   onBlur={event => this.validation(event, "^.{10,13}$", "Enter 10-13 Characters")}
                                                   error={this.state.isbnNumberError.trim().length !== 0}
                                                   helperText={this.state.isbnNumberError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <TextField id="noOfCopies" label="Stock Quantity"
                                                   onChange={this.handleChange}
                                                   name="Stock Quantity"
                                                   value={this.state.noOfCopies}
                                                   variant="outlined"
                                                   fullWidth
                                                   size="small"
                                                   onBlur={event => this.validation(event, "^[1-9]{1}[0-9]{0,}", "Enter Value (greater Than 0)")}
                                                   error={this.state.noOfCopiesError.trim().length !== 0}
                                                   helperText={this.state.noOfCopiesError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <TextField
                                            id="bookPrice" label="Price" onChange={this.handleChange}
                                            name="Price"
                                            value={this.state.bookPrice}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            onBlur={event => this.validation(event, "^[1-9]{1}[0-9]{0,}", "Enter Value (greater Than 0)")}
                                            error={this.state.bookPriceError.trim().length !== 0}
                                            helperText={this.state.bookPriceError}
                                            required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            id="publishingYear" label="Year" name="Year"
                                            value={this.state.publishingYear}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            onBlur={event => this.validation(event, `^(140[0-9]|19[5-9]\\d|20[0-${[2] - 1}]\\d|20${[2]}[0-${[3]}])$`, "Enter value greater than 1400 to 2023")}
                                            error={this.state.publishingYearError.trim().length !== 0}
                                            helperText={this.state.publishingYearError}
                                            required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className="fileInputDiv">
                                            <input
                                                name="File"
                                                onBlur={event => this.validation(event, "^.{3,}$", "Choose Image")}
                                                accept="image/*"
                                                className="input"
                                                id="bookImageSrc"
                                                type="file"
                                                required
                                                onChange={this.handleChange}
                                                value={this.state.bookImageSrc}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField id="bookDetails" label="Book Description" multiline rows={2}
                                                   name="Details"
                                                   onChange={this.handleChange}
                                                   value={this.state.bookDetails}
                                                   variant="outlined"
                                                   fullWidth
                                                   size="small"
                                                   onBlur={event => this.validation(event, "^.{10,}$", "Enter Minimum 10 Character")}
                                                   error={this.state.bookDetailsError.trim().length !== 0}
                                                   helperText={this.state.bookDetailsError}
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button className="btn"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                startIcon={<SaveIcon/>}
                                                onClick={this.addBook}
                                                disabled={this.state.requiredFieldCheck.length <= 7}
                                        >
                                            Save
                                        </Button>
                                        <Button className="btn"
                                                variant="contained"
                                                color="secondary"
                                                size="large"
                                                startIcon={<CancelOutlinedIcon/>}
                                                onClick={this.clearFieldsData}
                                        >
                                            Clear
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </StylesProvider>
                </Container>
            </Fragment>
        );
    }
}