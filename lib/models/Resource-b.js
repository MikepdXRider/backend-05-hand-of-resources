const pool = require("../utils/pool.js");

module.exports = class ResourceB {
    id;
    name;
    description;
    inStock;

    constructor(row){
        this.id = row.id;
        this.name = row.name;
        this.description = row.description;
        this.inStock = row.in_stock;
    }

    static async insert({name, description, inStock}){
        const { rows } = await pool.query(
            'INSERT INTO resource_b(name, description, in_stock) VALUES ($1, $2, $3) RETURNING *', [name, description, inStock]
            );

        return new ResourceB(rows[0]);
    }

    static async getAll({name, description, inStock}){
        const { rows } = await pool.query(
            'SELECT * FROM resource_b',
            );

        return rows.map(row => new ResourceB(rows));
    }
}