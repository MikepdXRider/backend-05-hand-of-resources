const pool = require('../utils/pool');

module.exports = class ResourceE{
    id;
    contactName;
    company;
    prefContactMethod;
    email;
    phoneNum;

    constructor(row){
        this.id = row.id;
        this.contactName = row.contact_name;
        this.company = row.company;
        this.prefContactMethod = row.pref_contact_method;
        this.email = row.email;
        this.phoneNum = row.phone_num;
    }

    static async insert({ contactName, company, prefContactMethod, email, phoneNum }){
        const { rows } = await pool.query(
            'INSERT INTO resource_e(contact_name, company, pref_contact_method, email, phone_num) VALUES($1, $2, $3, $4, $5) RETURNING *', [contactName, company, prefContactMethod, email, phoneNum]
        )
        return new ResourceE(rows[0]);
    }

    static async getAll(){
        const { rows } = await pool.query(
            'SELECT * FROM resource_e'
        )
        return rows.map(row => new ResourceE(row));
    }

    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM resource_e WHERE id=$1', [id]
        )

        if(!rows[0]){
            const error = new Error('selected resource does not exist');
            error.status = 400;
            throw error;
        }

        return new ResourceE(rows[0]);
    }

    static async updateById(id, updateObj){
        const getByIdResponse = await ResourceE.getById(id);

        const contactName = updateObj.contactName ?? getByIdResponse.contactName;
        const company = updateObj.company ?? getByIdResponse.company;
        const prefContactMethod = updateObj.prefContactMethod ?? getByIdResponse.prefContactMethod;
        const email = updateObj.email ?? getByIdResponse.email;
        const phoneNum = updateObj.phoneNum ?? getByIdResponse.phoneNum;

        const { rows } = await pool.query(
            'UPDATE resource_e SET contact_name=$1, company=$2, pref_contact_method=$3, email=$4, phone_num=$5 WHERE id=$6 RETURNING *', [contactName, company, prefContactMethod, email, phoneNum, id]
        )

        return new ResourceE(rows[0]);
    }

    static async deleteById(id){
        const { rows } = await pool.query(
            'DELETE FROM resource_e WHERE id=$1 RETURNING *', [id]
        )
        return new ResourceE(rows[0]);
    }
}