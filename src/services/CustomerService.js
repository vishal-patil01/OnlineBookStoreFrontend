import {post} from "./HttpService";

export default class CustomerService {

    addCustomer(customer) {
        return (post(customer, `customer`));
    }
}
