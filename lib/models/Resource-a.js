const pool = require('../utils/pool');

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
        const { rows } = await pool.query(
            'INSERT INTO resource_a(name, description, quantity) VALUES($1, $2, $3) RETURNING *', [name, description, quantity]
        );
        return new ResourceA(rows[0]);
    }

    static async getAll(){
        const { rows } = await pool.query(
            'SELECT * FROM resource_a'
        );
        return rows.map(row => new ResourceA(row));
    }

    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM resource_a WHERE id=$1', [id]
        );

        // make sure the request resource exists, if not, throw an error.

        return new ResourceA(rows[0]);
    }

    static async updateById(id, updateObj){
        const getByIdResponse = await ResourceA.getById(id);

        const name = updateObj.name ?? getByIdResponse.name;
        const description = updateObj.description ?? getByIdResponse.description;
        const quantity = updateObj.quantity ?? getByIdResponse.quantity;

        const { rows } = await pool.query(
            'INSERT INTO resource_a(name, description, quantity) VALUES($1, $2, $3)', [name, description, quantity]
        )

        return new ResourceA(rows[0]);
    }
}