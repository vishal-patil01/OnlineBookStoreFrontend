import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import "../../css/Book.css";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from 'react-router';
import DialogBoxPage from "../utils/CustomDialogBox";
import CustomSnackBar from "../utils/CustomSnackBar";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,

            isDialogBoxVisible: false,
            isAddToWishList: false,

            alertShow: false,
            alertResponse: "",
            severity: "",
            url: this.props.location.pathname,
        };
    }

    handle = () => {
        this.props.history.push('/login');
    }

    dialogBoxOpen = () => {
        if (localStorage.getItem('token') === null)
            this.setState({
                isDialogBoxVisible: true,
            });
    };

    dialogBoxClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
    };
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };


    render() {
        const DetailTooltip = withStyles((theme) => ({
            arrow: {
                color: theme.palette.common.white,
            },
            tooltip: {
                backgroundColor: 'white',
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: theme.shadows[8],
                fontSize: 1,
                maxWidth: 480,
                padding: 15,
                overflowScrolling: 'auto',
            },
        }))(Tooltip);
        return (
            <Card id="card">
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible} close={this.dialogBoxClose}/>
                <DetailTooltip title={
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom color="inherit"><b style={{fontSize: '16px'}}>Book
                            Description</b></Typography>
                        <Typography color="grey" style={{
                            fontSize: '13px',
                            textAlign: "justify"
                        }}>{this.props.bookId.bookDetail}</Typography>
                    </React.Fragment>}
                               placement="right-start" arrow>
                    <CardActionArea id="CardContainer">
                        <CardMedia id="bookImage"
                                   component="img"
                                   image={this.props.bookId.bookImageSrc}
                        />
                        <div className="outOfStockLabel"
                             style={this.props.bookId.noOfCopies === 0 ? {visibility: "visible"} : {visibility: "hidden"}}>OUT
                            OF
                            STOCK
                        </div>
                    </CardActionArea>
                </DetailTooltip>
                <CardContent id="cardBottom">
                    <p className="bookTitle">{this.props.bookId.bookName}</p>
                    <p className="bookAuthorName">by {this.props.bookId.authorName}</p>
                    <p className="bookPrice">Rs. {this.props.bookId.bookPrice}</p>
                    {this.state.url === "/" ?
                        <Button id="addToCartButton" variant="contained" size="small"
                                style={{
                                    color: "white",
                                    backgroundColor: '#b90f4b'
                                }}>
                            Add to Cart
                        </Button>
                        : <Button style={{
                            color: "white",
                            backgroundColor: '#b90f4b'
                        }} onClick={() => this.updateBook(this.props.bookId)}>Update Book </Button>
                    }
                </CardContent>
            </Card>
        )
    };
}

export default withRouter(Book);
