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
        
        if(!rows[0]) {
            const error = new Error('Selected resource does not exist');
            error.status = 400;
            throw error;
        };

        return new ResourceA(rows[0]);
    }

    static async updateById(id, updateObj){
        const getByIdResponse = await ResourceA.getById(id);

        const name = updateObj.name ?? getByIdResponse.name;
        const description = updateObj.description ?? getByIdResponse.description;
        const quantity = updateObj.quantity ?? getByIdResponse.quantity;

        const { rows } = await pool.query(
            'UPDATE resource_a SET name=$1, description=$2, quantity=$3 WHERE id=$4 RETURNING *', [name, description, quantity, id]
        );

        return new ResourceA(rows[0]);
    }

    static async deleteById(id){
        const { rows } = await pool.query(
            'DELETE FROM resource_a WHERE id=$1 RETURNING *', [id]
        );
        return new ResourceA(rows[0]);
    }
}