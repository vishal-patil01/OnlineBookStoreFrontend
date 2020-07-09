import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import '../../css/ProductReview.css';
import {ThemeProvider} from '@material-ui/styles';
import NavigationBar from "../utils/NavigationBar";
import Link from "@material-ui/core/Link";
import CustomerService from "../../services/CustomerService";

export default class ProductReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            bookInfo: '',
            feedback: '',
            feedbacks: [],
            feedbackLength: 0,
            readMore: true,
        }
    }

    componentDidMount() {
        this.setState({
            bookInfo: this.props.location.state.bookInfo
        });
    }

    handleChange(field, event) {
        this.setState({[event.target.name]: event.target.value});
    }

    addFeedback = (e) => {
        var data = {
            rating: this.state.rating,
            feedbackMessage: this.state.feedback,
            isbn: this.state.bookInfo.isbnNumber
        };

        new CustomerService().addFeedback(data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        this.setState({
            rating: '',
            feedback: ''
        },()=>e.preventDefault());
        window.location.reload(false);
    }

    handleReadMore=()=> {
        this.setState({readMore: false});
        return (
            this.displayBookDetail()
        );
    }

    handleReadLess=()=> {
        this.setState({readMore: true});
        return (
            this.displayBookDetail()
        );
    }

    displayBookDetail=()=> {
        let bookDiscription = [];
        if (this.state.readMore) {
            var text = String(this.state.bookInfo.bookDetail);
            text = text.split(" ");
            bookDiscription = text.slice(0, 40).join(" ");
            return (<p>{bookDiscription}...<span className="read-more" onClick={() => {
                this.handleReadMore(this)
            }}>Read More</span></p>)
        }

        if (!this.state.readMore) {
            bookDiscription = this.state.bookInfo.bookDetail;
            return (<p>{bookDiscription}<span className="read-more" onClick={() => {
                this.handleReadLess(this)
            }}>Read Less</span></p>)
        }
    }

    render() {
        const isAdminPage = localStorage.getItem('userName') === "Admin";
        let feedbackForm = [];
        if(localStorage.getItem("token") !== null){
            feedbackForm =
                <div className="customer-feedback-form product-review-font">
                    <span className="product-review-bookdetail-size">Overall rating</span>
                    <Rating
                        name="rating"
                        value={this.state.rating}
                        onChange={this.handleChange.bind(this, 'rating')}
                    />
                    <ThemeProvider>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            color="secondary"
                            name="feedback"
                            rows={4}
                            onChange={this.handleChange.bind(this, 'feedback')}
                            variant="outlined"
                            style={{width: "92.5%", backgroundColor: "white"}}
                        />
                    </ThemeProvider>
                    <div className="product-feedback-button-container">
                        <Button id="productfeedbackbutton" onClick={e=>this.addFeedback(e)}>Submit</Button>
                    </div>
                </div>

        }
        if(this.state.feedbackLength>0 || isAdminPage){
            feedbackForm=[];
        }

        return (
            <div>
                <NavigationBar/>
                <div className="orderTitle">
                    <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
                        <Link color="inherit" href={isAdminPage?"/admin":"/"}>
                            Home
                        </Link>
                        <Typography color="textPrimary">Comments</Typography>
                    </Breadcrumbs>
                </div>
                <div className="product-review-main">
                    <div className="product-review-product-info">
                        <div id="productreviewimage">
                            <img style={{height: "100%", width: "100%"}}
                                 src={`${this.state.bookInfo.bookImageSrc}`}
                                 alt="book"/>
                        </div>
                        <div className="product-info">
                            < div className="product-review-book-info">
                                <div style={{
                                    height: "150px",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    flexDirection: "column"
                                }}>
                                    <span className="product-review-book-name product-review-font">
                                        {this.state.bookInfo.bookName}
                                    </span>
                                    <span className="product-review-author-name product-review-font">by
                                        {" "+this.state.bookInfo.authorName}
                                    </span>
                                    <div className="product-rating">
                                        <span className="product-rating-count product-review-font"> 4.4 </span>
                                        <div className="product-review-rating-icon product-review-font"><StarIcon
                                            id="iconSize"/></div>
                                    </div>
                                    <span className="product-review-book-price product-review-font">Rs.
                                        {this.state.bookInfo.bookPrice}
                                    </span>
                                </div>
                                <Divider/>
                                <span className="product-review-bookdetail product-review-font">Book Description:</span>
                                <p className="product-review-bookdetail-size product-review-font">
                                    {this.displayBookDetail()}
                                </p>
                                <Divider/>
                                <span className="customer-feedback product-review-font">Customer Review</span>
                                {feedbackForm}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
