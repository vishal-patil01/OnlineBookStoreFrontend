import React, {Fragment} from 'react';
import {ExpansionPanel, Grid, Typography} from '@material-ui/core';
import CartView from "./CartView.js";
import {get} from "../../services/HttpService";
import NavigationBar from "../utils/NavigationBar";
import "../../css/CartPage.css";
import {createMuiTheme} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CartService from "../../services/CartService";
import {withRouter} from 'react-router';
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Loader from "react-loader-spinner";


class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded2: null,
            expanded3: null,
            AddedToCart: [],
            count: "",
            totalPrice: 0,

            isPanelOpen1: false,
            isPanelOpen2: false,
            isValid: false,
            isTest: false,
            isScrolled: false,
            isDialogBoxVisible: false,

            showProgress: false
        };
    }

    getBooksAddedToCart() {
        get("cart").then(response => {
            console.log("cart fetch");
            console.log(response);
            {
                (response.data.statusCode === 200) ?
                    this.setState({
                        AddedToCart: response.data.data,
                        count: response.data.data.length,
                    }, () => this.test())
                    :
                    this.setState({
                        isDialogBoxVisible: true,
                    })
            }
        })
            .catch(error => this.setState({error, isLoading: false}));
    };

    componentDidMount() {
        this.getBooksAddedToCart();
        this.getUserDetails();
        this.fetchCustomerDetails();
        window.addEventListener("scroll", () => {
            const isTop = window.scrollY < 100;
            console.log(isTop);
        })
    }

    handleRemove = id => event => {
        new CartService().deleteCart(id).then(response => {
            this.getBooksAddedToCart()
        });
    };

    test = () => {
        this.setState({
            totalPrice: this.state.AddedToCart.reduce(function (tot, arr) {
                console.log(arr)
                return tot + arr.quantity * arr.book.bookPrice;
            }, 0)
        })

    }

    render() {
        console.log(this.state.totalPrice)
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#b90f4b',
                },
            },
        });
        const AddedToCart = this.state.AddedToCart;
        const count = this.state.count;
        return (
            <Fragment>
                <NavigationBar/>
                <Grid container>
                    <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
                        <Link color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="textPrimary">Cart</Typography>
                    </Breadcrumbs>
                    <div id="cartContainer">
                        {this.state.showProgress &&
                        <Dialog className="processingDialog"
                                fullWidth={true}
                                onClose={this.state.showProgress}
                                aria-labelledby="customized-dialog-title"
                                open={this.state.showProgress}>
                            <DialogContent>
                                <div className="loaderDialog">
                                    <Loader
                                        type="ThreeDots"
                                        color="#fff"
                                        height={35}
                                        width={200}
                                        timeout={50000}
                                    />
                                </div>
                                <div>
                                    <Typography className="loaderText" variant="h6">
                                        <b>Wait while we are processing your request...</b>
                                    </Typography>
                                </div>
                            </DialogContent>
                        </Dialog>
                        }
                        <ExpansionPanel expanded id="expansionPanel">
                            <Typography component="h5" variant="h5" id="myCartHeader">My Cart
                                ({count})</Typography>
                            {count === 0 ?
                                <div id="emptyCart">
                                    <img src={require(`../../assets/uploads/emptyCart.png`)}
                                         alt="Empty CartPage"
                                         width="100px" height="100px"/>
                                    <h3>Your cart is empty</h3>
                                </div> : <div>
                                    <div id={count > 2 ? "cartScroll" : ""}>
                                        {AddedToCart.map((id, index) =>
                                            <Grid key={id.id} item xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <CartView
                                                    cartId={id.cartItemsId}
                                                    bookDetails={id}
                                                    qValue={id.quantity}
                                                    handleRemove={this.handleRemove}
                                                    totalPrice={this.getTotalPrice}
                                                    pannel={this.state.isPanelOpen1}
                                                />
                                                {index !== AddedToCart.length - 1 ?
                                                    <Divider/> : console.log()
                                                }
                                            </Grid>
                                        )}
                                    </div>
                                </div>
                            }
                        </ExpansionPanel>
                    </div>
                </Grid>
            </Fragment>
        );
    }
}

export default withRouter(CartPage);
