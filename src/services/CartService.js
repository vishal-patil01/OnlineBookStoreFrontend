import {deleteData, get, post, update} from "./HttpService";

export default class CartService {

    async addToCart(cart) {
        return (await post(cart, `cart`));
    }


    deleteCart(id) {
        return (deleteData(`cart/${id}`))
    }
}
