const {v4: uuidv4} = require('uuid');
const {Pool} = require('pg');

const config = {
    user: 'sasd',
    host: 'localhost',
    database: 'luckyroulette',
    password: '',
}
const pool = new Pool(config);

const getTicket = async(req, res) => {
    try {
        const consult =  "SELECT * FROM tickets WHERE numero_ticket = $1"
        const values = [req.params.id]
        const {rows} = await pool.query(consult, values);
        return res.json(rows);
    } catch (error) {
        res.json(error);
    }
}

const createTicket = async(req, res) => {
    const numero_ticket = uuidv4();
    const cut_number = numero_ticket.slice(0,8);
try {
        const {monto, premio, arr_animals} = req.body;
        const values = [cut_number, monto, premio, arr_animals];
        const consult = "INSERT INTO tickets(numero_ticket, monto_total, premio, fecha, animales_y_monto) VALUES($1, $2, $3, now(), $4)"
        await pool.query(consult, values);
        res.json({msg: "Ticket creado con exito", cut_number});
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async(req, res) => {
    try {
        const winners = req.body;
        const consult2 = "SELECT tickets.numero_ticket, UNNEST(animales_y_monto) -> 'name' AS name, UNNEST(animales_y_monto) -> 'amount' AS amount, EXTRACT(hour from fecha) AS hour FROM tickets";
        const {rows} = await pool.query(consult2);
        for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < winners.length; j++){
                const buy_hour = rows[i].hour;
                let hour;
                if(buy_hour < 9){
                    hour = 9;
                }else if(buy_hour >= 9 && buy_hour < 10){
                    hour = 10;
                }else if(buy_hour >= 9 && buy_hour < 10){
                    hour = 11;
                }else if(buy_hour >= 10 && buy_hour < 11){
                    hour = 12;
                }else if(buy_hour >= 11 && buy_hour < 12){
                    hour = 1;
                }else if(buy_hour >= 12 && buy_hour < 13){
                    hour = 2;
                }else if(buy_hour >= 13 && buy_hour < 14){
                    hour = 3;
                }else if(buy_hour >= 14 && buy_hour < 15){
                    hour = 4;
                }else if(buy_hour >= 15 && buy_hour < 16){
                    hour = 5;
                }else if(buy_hour >= 17 && buy_hour < 18){
                    hour = 6;
                }else if(buy_hour >= 18 && buy_hour < 19){
                    hour = 7;
                }
                if(rows[i].name == winners[j].name && hour == winners[j].hour){
                    const values = [rows[i].amount * 30, rows[i].numero_ticket];
                    console.log(values);
                    const consult = "UPDATE tickets SET premio = $1 WHERE numero_ticket = $2"
                    await pool.query(consult,values);
                }
            }
        }
        return res.json({msg: "Ticket actualizado con exito"});
    } catch (error) {
        console.log(error);
    }
}

const deleteTicket = async(req, res) => {
    try {
        const value = [req.params.id];
        const consult = "DELETE FROM tickets WHERE numero_ticket = $1";
        await pool.query(consult, value);
        return res.json({msg: "Ticket eliminado con exito"});
    } catch (error) {
        console.log(error);
    }
}

const add_json = async(req, res) => {
    try {
        
        const consult = "INSERT INTO tickets(animales_y_monto) VALUES ($1)";
        await pool.query(consult, values);
        res.json({msg: "se logro"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    add_json
}
