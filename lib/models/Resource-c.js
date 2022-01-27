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
}