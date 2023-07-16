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
    const { cart, nonce } = req.body;
    console.log(cart,nonce);
    const totalAmount = cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.Addedquantity;
    }, 0);

    gateway.transaction.sale(
      {
        amount: totalAmount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result) {
          try {
            const order = new Order({
              products: cart,
              
              payment: result,
              buyer: req.user._id,
            });

            await order.save();

            return res.json({success : true , message : "Payment successfull"});
          } catch (error) {
            console.log("Error in saving order:", error);
            return res.status(500).send(error);
          }
        } else {
          console.log("Error in sale:", error);
          return res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log("Error in payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in payment", error });
  }
}

