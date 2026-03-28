const express = require('express');
const crypto = require('crypto');
const path = require('path');
const { Client, Environment } = require('square');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // serve HTML/JS

const client = new Client({
  environment: Environment.Sandbox, // change to Environment.Production when live
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});

app.post('/payments', async (req, res) => {
  const { sourceId, amount } = req.body;

  if (!sourceId || !amount) {
    return res.status(400).json({ error: 'Missing sourceId or amount' });
  }

  try {
    const idempotencyKey = crypto.randomUUID();

    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount: amount, // in cents
        currency: 'USD'
      },
      locationId: process.env.SQUARE_LOCATION_ID
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
