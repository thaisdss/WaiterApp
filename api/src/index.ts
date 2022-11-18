import express from 'express';
import mongoose from 'mongoose';
import {router} from './router';
import path from 'node:path';

mongoose.connect('mongodb+srv://thaisdss:Jesuslindoo@cluster0.lpnthdq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    const app = express();

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    const port = 3001;
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb'));
