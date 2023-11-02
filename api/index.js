import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import { pool } from "./database/db.js"
const PORT = 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
        var query = `select * from users where username = '${username}'`
        var data = await pool.query(query);
        console.log(data.rows)
        if (data.rows.length !== 0) {
            return res.json({ msg: "User Already Exists" })
        }

        query = `select * from users where email = '${email}'`
        data = await pool.query(query);
        console.log(data.rows)
        if (data.rows.length !== 0) {
            return res.json({ msg: "Email Already Exists" })
        }

        query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const result = await pool.query(query, [username, email, password]);
        return res.json({ msg: "successfully signed up" })
    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`)
})