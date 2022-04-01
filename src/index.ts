import express from 'express';
import cors from 'cors';
import getUpdateUrl from './utils/getUpdateUrl';
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://ps3-update-tool.vercel.app'],
    methods: 'GET',
  })
);

app.get('/', async (req, res) => {
  const { serial } = req.query;

  if (!serial) return res.status(400).send('parameter serial is required');

  const updates = await getUpdateUrl(serial.toString());

  return res.status(200).send(updates);
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Runing in PORT ${PORT}...`);
});
