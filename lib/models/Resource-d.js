const pool = require('../utils/pool');

module.exports = class ResourceD {
    id;
    description;
    contractValue;

    constructor(row){
        this.id = row.id;
        this.description = row.description;
        this.contractValue = row.contract_value;
    }

    static async insert({description, contractValue}){
        const { rows } = pool.query(
            'SELECT * FROM resource_d'
        )
        return new ResourceD(rows[0]);
    }
}