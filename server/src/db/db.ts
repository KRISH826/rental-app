import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
    "DB_USER",
    "DB_HOST",
    "DB_DATABASE",
    "DB_PASSWORD",
    "DB_PORT",
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Error: Environment variable ${envVar} is missing.`);
        process.exit(1);
    }
}

const poolConfig: PoolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
};

export const pool = new Pool(poolConfig);

pool.on("error", (err) => {
    console.error("Unexpected error on idle PostgreSQL client", err);
    process.exit(-1);
});

export const connectDb = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ PostgreSQL connection pool established successfully");
        client.release();
    } catch (error) {
        console.error("❌ Failed to connect to PostgreSQL:", error);
        process.exit(1);
    }
};

export const disconnectDb = async () => {
    console.log("Closing PostgreSQL connection pool...");
    await pool.end();
};