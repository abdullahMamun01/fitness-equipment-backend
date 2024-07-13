import cors from 'cors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import handleEmptyResponse from './app/middleware/handleEmptyResponse';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(handleEmptyResponse);



// application routes
app.use('/api/v1', router);


app.use(globalErrorHandler)
app.use(notFound)

export default app;
