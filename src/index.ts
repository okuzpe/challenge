import 'dotenv/config';
import express, { Application } from 'express';
import routes from './routes';
import http from 'http';
import { db } from './db';

const app: Application = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DB
db();


//Routes
app.use('/', routes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
