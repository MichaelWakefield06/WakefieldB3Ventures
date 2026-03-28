const express = require('express');
const crypto = require('crypto');
const { Client, Environment } = require('square');

const app = express();
app.use(express.json());

const client = new Client({
  environment: Environment.Sandbox, // switch to Production when live
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});

app.post('/payments', async (req, res) => {
  const { sourceId } = req.body;

  if (!sourceId) {
    return res.status(400).json({ error: 'Missing sourceId' });
  }

  try {
    const idempotencyKey = crypto.randomUUID();

    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount: 1000, // $10.00
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
