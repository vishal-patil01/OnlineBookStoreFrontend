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


class Book extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    <Button id="addToCartButton" variant="contained" size="small"
                            style={{
                                color: "white",
                                backgroundColor: '#b90f4b'
                            }}>
                    </Button>
                </CardContent>
            </Card>
        )
    };
}

export default withRouter(Book);
