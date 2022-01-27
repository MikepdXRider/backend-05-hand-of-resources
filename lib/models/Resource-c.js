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
}