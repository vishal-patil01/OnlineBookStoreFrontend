import Axios from "axios";
import BASEURL from '../config/urlConstants'

function post(bookData, url) {
    return Axios({
        method: 'post',
        url: `${BASEURL.appUrl}${url}`,
        data: bookData,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

function get(url) {
    return Axios({
        method: 'get',
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}


export {post, get}
