import {post} from "./HttpService";

export default class AdminService {

    registerUser(formData) {
        return (post(formData, 'user/register'))
    }

    sendEmailWithTokenLink(email) {
        return (post(email, `user/send/email/${email}`))
    }

    verifyEmail(token) {
        return (update(`user/verify/email/${token}`))
    }
}
