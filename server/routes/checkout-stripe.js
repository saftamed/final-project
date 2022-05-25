const stripe = require('stripe')(process.env.STRIPE_CLIENT_KEY);

const YOUR_DOMAIN = 'https://gomycode-store.000webhostapp.com';
const Order = require('../models/Order');
const Product = require("../models/Product");
const { checkLogin } = require('./userMidelWare');
//product router
const router = require("express").Router();
router.post('/create-checkout-session',checkLogin, async (req, res) => {

    var total = 0;

    const products = await Product.find({
        _id: {
            $in: req.body.items.map(product => product.id)
        }
    })
    for (let product of products) {
        total += product.price * req.body.items.find(p => p.id == product._id).quantity
    }
    const order = new Order({
        userId: req.user.id,
        products: req.body.items,
        amount: total,
        address: req.body.address,
        status: "noPayment"
    })
    const savedOrder = await order.save()
    const session = await stripe.checkout.sessions.create({

        line_items: req.body.items.map(item => {
            const storeItem = products.find(p => p._id.toString() === item.id)
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: storeItem.title,
                },
                unit_amount: parseInt(storeItem.price * 100),
              },
              quantity: item.quantity,
            }
          }),
          mode: "payment",
      success_url: `${YOUR_DOMAIN}/success/${savedOrder._id}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    res.json({ url: session.url });
  });
  


  module.exports  = router;