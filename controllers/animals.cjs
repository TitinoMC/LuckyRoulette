
const {Pool} = require('pg');

const config = {
    user: 'sasd',
    host: 'localhost',
    database: 'luckyroulette',
    password: '',
}
const pool = new Pool(config);

const getAnimals = async(req, res) => {
    try {
        const consult = 'SELECT * FROM animalitos ORDER BY id';
        const {rows} = await pool.query(consult);
        return res.json(rows);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAnimals
}