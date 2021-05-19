const { Pool } = require('pg')
const { databaseName } = require('../config.json');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: databaseName,
    password: 'password',
    port: 5432,
})

const getGold = async () => {
    try {
        const rows = await pool.query('SELECT amountofgold FROM goldtracker')

        let amnt = rows.rows[0].amountofgold
        return amnt;

    }
    catch (err) {
        console.error(err)
    }

}

const updateGold = async (newAmount) => {
    try {
        await pool.query('UPDATE goldtracker SET amountofgold = $1', [newAmount])
    }
    catch (err) {
        console.error(err)
    }
}

const resetGold = async () => {
    try {
        await pool.query('UPDATE goldtracker SET amountofgold = 0')
    }
    catch (err) {
        console.error(err)
    }
}

const init = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS goldtracker; CREATE TABLE goldtracker(amountofgold DOUBLE PRECISION); INSERT INTO goldtracker(amountofgold) VALUES(0);')
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = {
    getGold,
    updateGold,
    resetGold,
    init,
    
}