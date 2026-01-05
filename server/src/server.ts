import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { connectDb, disconnectDb } from './db/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Rental App Backend is running!' });
});

// Start server
const server = app.listen(port, async () => {
    console.log(`🚀 Server is running on port ${port}`);
    await connectDb();
});

// Graceful Shutdown
const gracefulShutdown = async () => {
    console.log('Received shutdown signal. Closing server and database...');
    server.close(async () => {
        console.log('HTTP server closed.');
        await disconnectDb();
        console.log('Database pool closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

