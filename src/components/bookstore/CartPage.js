import React, {Fragment} from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CartView from "./CartView.js";
import FormControl from "@material-ui/core/FormControl";
import {get} from "../../services/HttpService";
import NavigationBar from "../utils/NavigationBar";
import "../../css/CartPage.css";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
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


    handleChange = ({target}) => {
        this.setState({
            [target.id]: target.value,
        });
    };

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
        const {expanded2} = this.state;
        const {expanded3} = this.state;
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
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button variant="outlined"
                                                id="confirmOrderButton"
                                                size="large"
                                                color="inherit"
                                                onClick={this.handleButtonClick2('panel2')}
                                                style={this.state.isPanelOpen1 === false ? {
                                                    width: "136",
                                                    fontSize: "14px",
                                                    visibility: "visible",
                                                    background: "#b90f4b",
                                                    marginBottom: "20px",
                                                    marginRight: "20px",
                                                    float: 'right',
                                                    color: "white",
                                                    marginTop: "2%"
                                                } : {visibility: "hidden"}}
                                        >
                                            CONFIRM ORDER
                                        </Button>
                                    </Grid>
                                </div>
                            }
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded2 === 'panel2'} id="expansionPanel">
                            <ExpansionPanelSummary>
                                <Typography component="h5" variant="h5" id="cartHeader"
                                >Customer Details</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{display: "flex", flexDirection: "column"}}>
                                <Grid container spacing={1} alignItems="center" style={{width: "70%"}}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <ThemeProvider theme={theme}>
                                            <TextField id="cName" label="Name" variant="outlined"
                                                       className="customerName"
                                                       name="Name"
                                                       style={{marginLeft: "10%"}}
                                                       value={this.state.cName}
                                                       disabled
                                                       size="small"
                                                       helperText=" "
                                                       fullWidth required/>
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="cPhone" label="Phone Number" variant="outlined"
                                                   className="phoneNumber" name="Phone Number"
                                            // style={{marginLeft: "15%"}}
                                                   value={this.state.cPhone}
                                                   disabled
                                                   size="small"
                                                   helperText=" "
                                                   fullWidth required/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField id="cAddress" label="Address" multiline
                                                   onChange={this.handleChange}
                                                   name="Address"
                                                   className="address"
                                                   style={{marginLeft: "5%", width: "103%"}}
                                                   value={this.state.cAddress}
                                                   size="small"
                                                   disabled={this.state.isTest}
                                                   helperText={this.state.cAddressError}
                                                   rows={3} variant="outlined" fullWidth required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="cTown" label="City/Town" variant="outlined"
                                                   name="City/Town"
                                                   className="cityTown"
                                                   style={{marginLeft: "10%"}}
                                                   disabled={this.state.isTest}
                                                   onChange={this.handleChange}
                                                   value={this.state.cTown}
                                                   size="small"
                                                   helperText={this.state.cTownError}
                                                   fullWidth required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="cPin" label="Pin Code" variant="outlined"
                                                   name="Pin Code"
                                                   className="pinCode"
                                            // style={{marginLeft: "15%"}}
                                                   value={this.state.cPin}
                                                   disabled={this.state.isTest}
                                                   onChange={this.handleChange}
                                                   size="small"
                                                   helperText={this.state.cPinError}
                                                   fullWidth required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="cLocality" label="Locality" variant="outlined"
                                                   name="Locality"
                                                   className="locality"
                                                   style={{marginLeft: "10%"}}
                                                   value={this.state.cLocality}
                                                   disabled={this.state.isTest}
                                                   onChange={this.handleChange}
                                                   size="small"
                                                   helperText={this.state.cLocalityError}
                                                   fullWidth required/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField id="cLandmark" label="Landmark" variant="outlined"
                                                   name="Landmark"
                                                   className="landmark"
                                            // style={{marginLeft: "15%"}}
                                                   disabled={this.state.isTest}
                                                   onChange={this.handleChange}
                                                   value={this.state.cLandmark}
                                                   size="small"
                                                   helperText={this.state.cLandmarkError}
                                                   fullWidth required/>
                                    </Grid>
                                    <Grid item xs={12} sm={7} md={7} style={{marginLeft: "5%"}}>
                                        <Typography style={{display: "flex"}}>Type</Typography>

                                        <FormControl component="fieldset" style={{display: "flex"}}>
                                            <RadioGroup row aria-label="type" id="type" name="type"
                                                        value={this.state.type}
                                                        onChange={this.handleRadioButton}>
                                                <FormControlLabel value="HOME"
                                                                  disabled={this.state.isTest}
                                                                  control={<Radio style={{color: "#b90f4b"}}/>}
                                                                  label="Home"/>

                                                <FormControlLabel value="WORK"
                                                                  disabled={this.state.isTest} W
                                                                  control={<Radio style={{color: "#b90f4b"}}/>}
                                                                  label="Work"/>

                                                <FormControlLabel value="OTHER"
                                                                  disabled={this.state.isTest}
                                                                  control={<Radio style={{color: "#b90f4b"}}/>}
                                                                  label="Other"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Grid>
            </Fragment>
        );
    }
}

export default withRouter(CartPage);
