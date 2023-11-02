import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    user: 'admin',
    host: 'dpg-cl19e63mgg9c7385bf10-a.oregon-postgres.render.com',
    database: 'wishlist_db_lat2',
    password: 'FWVlwYhYwLQqXIkM6DbqjRTnd6c0GufL',
    port: '5432',
    ssl: {
        rejectUnauthorized: false,
    },
});