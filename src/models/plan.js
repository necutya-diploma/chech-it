export default class Plan {
    constructor(id, name, description, options ,price, duration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.options = options;
        this.price = price;
        this.duration = duration;
    }
}