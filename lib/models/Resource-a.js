module.exports = class ResourceA {
    id;
    name;
    description;
    quantity;

    constructor(row){
        this.id = row.id;
        this.name = row.name;
        this.description = row.description;
        this.quantity = row.quantity;
    }

    static async insert({name, description, quantity}){
        const { rows } = pool.query(
            'INSERT INTO resource_a VALUES($1, $2, $3) RETURNING *', [name, description, quantity]
        );

        return new ResourceA(rows[0]);
    }
}