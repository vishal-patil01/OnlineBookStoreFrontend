import {post} from "./HttpService";

export default class AdminService {

    registerUser(formData) {
        return (post(formData, 'user/register'))
    }

    loginUser = (formData) => {
        return (post(formData, 'user/login'))
    }
}
