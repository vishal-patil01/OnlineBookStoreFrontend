import React, {Fragment} from 'react';
import "../../css/AddBook.css"
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import TextField from '@material-ui/core/TextField'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {StylesProvider} from "@material-ui/core/styles";
import AdminHeader from "./Header";


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
        };
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

    render() {
        return (
            <Fragment>
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
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="authorName" label="Author Name" onChange={this.handleChange}
                                                   name="Author Name"
                                                   size="small"
                                                   value={this.state.authorName}
                                                   variant="outlined"
                                                   fullWidth
                                                   required/>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4}>
                                        <TextField id="isbnNumber" label="ISBN" onChange={this.handleChange}
                                                   name="ISBN" value={this.state.isbnNumber} variant="outlined"
                                                   fullWidth
                                                   size="small"
                                                   onFocus
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
                                            required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className="fileInputDiv">
                                            <input
                                                name="File"
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
                                                   required/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button className="btn"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                startIcon={<SaveIcon/>}>
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