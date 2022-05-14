import express from 'express';
import helmet from 'helmet';
import createRoutes from '../routes';
import cors from 'cors';

/**
 * Express instance
 * @public
 */
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

/* mount api version routes */
createRoutes(app);

app.use(helmet());

export default app;
