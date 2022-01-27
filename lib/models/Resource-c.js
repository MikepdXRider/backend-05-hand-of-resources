const pool = require('../utils/pool');

module.exports = class ResourceC {
    id;
    warning;
    isResolved;
    timeOfError;

    constructor(row){
        this.id = row.id;
        this.warning = row.warning;
        this.isResolved = row.isResolved;
        this.timeOfError = row.timeOfError;
    }

    static async insert({warning, isResolved}){
        const { rows } = await pool.query(
            'INSERT INTO resource_c(warning, is_resolved) VALUES($1, $2)', [warning, isResolved]
        )
    }
}