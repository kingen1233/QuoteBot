const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'baod',
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

module.exports = {
    getGold,
    updateGold,
    resetGold,
    
}

/*
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'baod',
    password: 'password',
    port: 5432,
})

client.connect()
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})
*/