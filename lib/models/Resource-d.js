const pool = require('../utils/pool');

module.exports = class ResourceD {
    id;
    description;
    contractValue;

    constructor(row){
        this.id = row.id;
        this.description = row.description;
        this.contractValue = row.contract_value;
        this.name = row.name;
    }

    static async insert({ name, description, contractValue }){
        const { rows } = await pool.query(
            'INSERT INTO resource_d(name, description, contract_value) VALUES($1, $2, $3) RETURNING *', [name, description, contractValue] 
        )
        return new ResourceD(rows[0]);
    }

    static async getAll(){
        const { rows } = await pool.query(
            'SELECT * FROM resource_d'
        )
        return rows.map(row => new ResourceD(row));
    }

    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM resource_d WHERE id=$1', [id]
        )

        if(!rows[0]){
            const error = new Error('selected resource does not exist')
            error.status = 400;
            throw error;
        }

        return new ResourceD(rows[0]);
    }

    static async updateById(id, updateObj){
        const getByIdResponse = await ResourceD.getById(id);

        const name = updateObj.name ?? getByIdResponse.name;
        const description = updateObj.description ?? getByIdResponse.description;
        const contractValue = updateObj.contractValue ?? getByIdResponse.contractValue;
        
        const { rows } = await pool.query(
            'UPDATE resource_d SET name=$1, description=$2, contract_value=$3 RETURNING *', [name, description, contractValue]
        )
        return new ResourceD(rows[0]);
    }

    static async deleteById(id){
        const { rows } = await pool.query(
            'DELETE FROM resource_d WHERE id=$1 RETURNING *', [id]
        )

        return new ResourceD(rows[0]);
    }
}