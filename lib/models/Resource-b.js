const pool = require("../utils/pool.js");

module.exports = class ResourceB {
    id;
    name;
    quantity;
    inStock;

    constructor(row){
        this.id = row.id;
        this.name = row.name;
        this.quantity = row.quantity;
        this.inStock = row.in_stock;
    }

    static async insert({name, quantity, inStock}){
        const { rows } = await pool.query(
            'INSERT INTO resource_b(name, quantity, inStock) value($1, $2, $3)' [name, quantity, inStock]
            )

        return new ResourceB(rows[0]);
    }
}