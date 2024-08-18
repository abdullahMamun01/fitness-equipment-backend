import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import handleEmptyResponse from './app/middleware/handleEmptyResponse';
import fileUpload from 'express-fileupload'

const app: Application = express();

const allowedOrigins = ['http://localhost:5173' , ];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true, // Enable if you're sending cookies or HTTP authentication
};

app.use(cors(options));
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true
}))
app.use(handleEmptyResponse);


//root route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Welcome to the Fitness equipment backend API'});
  });
// application routes
app.use('/api', router);


app.use(globalErrorHandler)
app.use(notFound)

export default app;
