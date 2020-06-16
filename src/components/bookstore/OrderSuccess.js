import React, {Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import CardMedia from '@material-ui/core/CardMedia';
import "../../css/OrderSuccess.css"
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

export default class UpdateBook extends React.Component {
    constructor(props) {
        super(props);
        this.props.location.state === undefined ?
            window.location.href = '/'
            :
            console.log(this.props.location.state.orderId);
    }

    render() {
        const email = "admin@bookstore.com";
        const mobileNumber = "9874563210";
        const address = "Malhotra Chambers, First Floor, Govandi East, Mumbai, Maharashtra 400088";
        return (
            <Fragment>
                <NavigationBar/>
                <CardContent id="orderContainer">
                    <CardMedia id="orderImage"
                               component="img"
                               image={require(`../../assets/images/OrderSummaryImage.svg`)}
                    />
                    <b className="orderLabel">Order Placed Successfully</b>
                </CardContent>
                <div className="orderMessage">
                    hurray!!! your order is confirmed the order id is
                    <b> #{this.props.location.state.orderId}</b> save the order id
                    for further communication...
                </div>
                <table className="orderTable">
                    <thead>
                    <tr className="tableRow">
                        <th>Email Us</th>
                        <th>Contact Us</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="tableRow">
                        <td data-for='emailId'>{email}
                        </td>
                        <td data-for='mobileNumber'>{mobileNumber}
                        </td>
                        <td data-for='address'> {address}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Button href={"/"} className="orderButton">Continue Shopping</Button>
            </Fragment>
        );
    }
}
