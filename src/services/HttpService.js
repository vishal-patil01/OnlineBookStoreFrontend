import Axios from "axios";
import BASEURL from '../config/url'

function post(bookData, url) {
    return Axios({
        method: 'post', headers: {"Content-Type": "application/json"},
        url: `${BASEURL.appUrl}${url}`,
        data: bookData
    })
}
export {post}
