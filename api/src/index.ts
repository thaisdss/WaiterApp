import express from 'express';
import mongoose from 'mongoose';
import {router} from './router';
import { Server } from 'socket.io';
import path from 'node:path';
import http from 'node:http';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(`mongodb+srv://${process.env.REACT_APP_MONGODB_USER}:${process.env.REACT_APP_MONGODB_PASSWORD}@cluster0.lpnthdq.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    const port = 3001;
    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb'));
