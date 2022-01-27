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

    static async getAll(){
        const { rows } = await pool.query(
            'SELECT * FROM resource_b'
        );
        return rows.map(row => new ResourceB(row));
    }

    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM resource_b WHERE id=$1', [id]
        );
        return new ResourceB(rows[0]);
    }

    static async updateById(id, updateObj){
        const getByIdResponse = await ResourceB.getById(id);

        const name = updateObj.name ?? getByIdResponse.name
        const description = updateObj.description ?? getByIdResponse.description
        const inStock = updateObj.inStock ?? getByIdResponse.inStock

        const { rows } = await pool.query(
            'UPDATE resource_b SET name=$1, description=$2, in_stock=$3', [name, description, inStock]
        );
        
        return new ResourceB(rows[0]);
    }
}