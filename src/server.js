import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import connectDB from './config/db.js';

connectDB();

const app = express();

app.use(helmet());
app.use(xss());
app.use(cors({ credentials: true, origin: process.env.CORS_ALLOW_ORIGIN || '*' }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
//   next();
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
