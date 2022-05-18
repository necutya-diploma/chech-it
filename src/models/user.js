export default class User {
    constructor(id, firstName, lastName, email, password ,receive_notification, role, plan_id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.receive_notification = receive_notification;
        this.role = role;
        this.plan_id = plan_id;
    }
}