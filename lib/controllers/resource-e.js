const pool = require('../utils/pool');

module.exports = class ResourceE{
    id;
    company;
    prefContactMethod;
    email;
    phoneNum;

    constructor(row){
        this.id = row.id;
        this.company = row.company;
        this.prefContactMethod = row.pref_contact_method;
        this.email = row.email;
        this.phoneNum = row.phone_num;
    }

    static async insert({ company, prefContactMethod, email, phoneNum }){
        const { rows } = pool.query(
            'INSERT INTO resource_e(company, pref_contact_method, email, phone_num) VALUES($1, $2, $3, $4)', [company, prefContactMethod, email, phoneNum]
        )
        return new ResourceE(rows[0]);
    }
}