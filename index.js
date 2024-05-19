import express from 'express';
import bodyParser from 'body-parser';
import sleepRoutes from './routes/sleep.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/sleep', sleepRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
