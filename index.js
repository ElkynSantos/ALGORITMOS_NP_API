import express from 'express';
import cors from 'cors';

import problemRoutes from './routes/Problems.Routes.js';

const app = express();
const port = 3001;
app.use(cors());

app.use(express.json());

app.use('/api/problems', problemRoutes);

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.listen(port, () => {
  console.log(`server listening in http://localhost:${port}`);
});