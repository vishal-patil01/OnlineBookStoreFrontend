import {CardMedia, Typography} from "@material-ui/core";
import React, {Fragment} from 'react';
import "../../css/CartView.css"

export default class CartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qValue: this.props.qValue,
            totalPrice: 0
        };
    }

    render() {
        return (
            <Fragment>
                <div container className="displayCart">
                    <CardMedia className="imageCart"
                               component="img"
                               image={this.props.bookDetails.book.bookImageSrc}
                               title={this.props.bookDetails.book.bookName}
                    />
                    <div className="details">
                        <Typography component="h2" className="bookName"
                        >
                            {this.props.bookDetails.book.bookName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="authorName"
                        >
                            by {this.props.bookDetails.book.authorName}
                        </Typography>
                        <Typography component="h2"
                                    className="price">Rs {(this.props.bookDetails.book.bookPrice * this.state.qValue)}
                        </Typography>

                    </div>
                </div>
            </Fragment>
        )
    }
};