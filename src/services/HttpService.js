import Axios from "axios";
import BASEURL from '../config/urlConstants'

function post(bookData, url) {
    return Axios({
        method: 'post', headers: {"Content-Type": "application/json"},
        url: `${BASEURL.appUrl}${url}`,
        data: bookData
    })
}
function get(url) {
    return Axios({
        method: 'get', headers: {"Content-Type": "application/json"},
        url: `${BASEURL.appUrl}${url}`,
    })
}

export {post,get}
