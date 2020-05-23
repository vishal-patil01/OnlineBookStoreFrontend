import {post} from "./HttpService";

export default class CartService {

    async addToCart(cart) {
        return (await post(cart, `cart`));
    }
}
