import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import "../../css/BookCard.css";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

export default class BookCard extends React.Component {
    render() {
        const DetailTooltip = withStyles((theme) => ({
            arrow: {
                color: theme.palette.common.white,
            },
            tooltip: {
                backgroundColor: theme.palette.common.white,
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: theme.shadows[8],
                fontSize: 3,
                maxWidth: 420,
                padding: 15,
            },
        }))(Tooltip);

        return (

            <DetailTooltip title={
                <React.Fragment>
                    <Typography variant="h6" gutterBottom color="inherit"><b>Book Description</b></Typography>
                    <Typography color="grey">{this.props.bookDetails}</Typography>
                </React.Fragment>}
                           placement="right-start" arrow>

                <Card className="cards">
                    <CardActionArea id="CardContainer">
                        <CardMedia id="bookImage"
                                   component="img"
                                   image={require(`../../assets/uploads/${this.props.image}`)}
                        />
                        <div className="outOfStockLabel"
                             style={this.props.noOfCopies === 0 ? {visibility: "visible"} : {visibility: "hidden"}}>OUT
                            OF
                            STOCK
                        </div>
                    </CardActionArea>

                    <CardContent id="cardBottom">
                        <p className="bookTitle">{this.props.bookName}</p>
                        <p className="bookAuthorName">by {this.props.authorName}</p>
                        <p className="bookPrice">Rs. {this.props.bookPrice}</p>
                        <Button id="addToCartButton" variant="contained" size="small"
                                style={this.props.noOfCopies === 0 ? {color: "black"} : {
                                    color: "white",
                                    backgroundColor: "#b90f4b"
                                }}
                                disabled={this.props.noOfCopies === 0}
                        >

                            Add To Cart
                        </Button>
                    </CardContent>
                </Card>
            </DetailTooltip>
        )
    };
}
