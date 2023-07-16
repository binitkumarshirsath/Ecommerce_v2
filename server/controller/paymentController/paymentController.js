import braintree from 'braintree';
import Order from '../../model/orderModel.js';
import dotenv from 'dotenv'
dotenv.config()

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export async function braintreeTokenController(req, res) {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).json({ success: false, err });
      } else {
        const clientToken = response.clientToken;
        return res.status(200).json({
          success: true,
          message: 'Client token generated',
          clientToken,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Error in token gen', error });
  }
}


export async function braintreePaymentController(req, res) {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ success: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}


