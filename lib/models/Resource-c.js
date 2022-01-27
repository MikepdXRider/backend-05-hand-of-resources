const pool = require('../utils/pool');

module.exports = class ResourceC {
    id;
    warning;
    isResolved;
    timeOfError;

    constructor(row){
        this.id = row.id;
        this.warning = row.warning;
        this.isResolved = row.is_resolved;
        this.timeOfError = row.time_of_error;
    }

    static async insert({warning, isResolved}){
        const { rows } = await pool.query(
            'INSERT INTO resource_c(warning, is_resolved) VALUES($1, $2) RETURNING *', [warning, isResolved]
        )
        return new ResourceC(rows[0]);
    }

    static async getAll(){
        const { rows } = await pool.query(
            'SELECT * FROM resource_c',
        )
        return rows.map(row => new ResourceC(row));
    }

    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM resource_c WHERE id=$1', [id]
        )

        if(!rows[0]){
            const error = new Error('selected resource does not exist')
            error.status = 400;
            throw error;
        }

        return new ResourceC(rows[0]);
    }

    static async updateById(id, updateObj){
        const getByIdResponse = await ResourceC.getById(id);

        const warning = updateObj.warning ?? getByIdResponse.warning; 
        const isResolved = updateObj.isResolved ?? getByIdResponse.isResolved; 

        const { rows } = await pool.query(
            'UPDATE resource_c SET warning=$1, is_resolved=$2 WHERE id=$3 RETURNING *', [warning, isResolved, id]
        )

        return new ResourceC(rows[0]);
    }

    static async deleteById(id){
        const { rows } = await pool.query(
            'DELETE FROM resource_c WHERE id=$1 RETURNING *', [id]
        )
        return new ResourceC(rows[0]);
    }
}