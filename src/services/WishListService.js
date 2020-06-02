import {deleteData, post} from "./HttpService";

export default class WishListService {

    async addToWishList(bookId) {
        return (await post(bookId, `wishlist/${bookId}`));
    }

    removeFromWishList(bookId) {
        return (deleteData(`wishlist/${bookId}`))
    }
}
