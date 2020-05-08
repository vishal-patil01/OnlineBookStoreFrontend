import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import "../../css/BookCard.css";

export default class BookCard extends React.Component {
    render() {
        return (
            <Card className="cards">
                <CardActionArea id="CardContainer">
                    <CardMedia id="bookImage"
                               component="img"
                               image={require(`../../assets/uploads/${this.props.image}`)}
                    />
                    <div className="outOfStockLabel"
                         style={this.props.noOfCopies === 0 ? {visibility: "visible"} : {visibility: "hidden"}}>OUT OF
                        STOCK
                    </div>
                </CardActionArea>
                <CardContent>
                    <p className="bookTitle">{this.props.bookName}</p>
                    <p className="bookAuthorName">by {this.props.authorName}</p>
                    <p className="bookPrice">Rs. {this.props.bookPrice}</p>
                    <Button id="addToCartButton" variant="contained" size="medium"
                            style={this.props.noOfCopies === 0 ? {backgroundColor: "#e0e0e0"} : {backgroundColor: "#B90F4B"}}
                            disabled={this.props.noOfCopies === 0}
                    >
                        Add To Cart
                    </Button>
                </CardContent>
            </Card>
        )
    };
}
