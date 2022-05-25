const Product = require("../models/Product");
//product router
const router = require("express").Router();

const paypal = require("@paypal/checkout-server-sdk");
const Order = require("../models/Order");
const { checkLogin } = require("./userMidelWare");
const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
)

router.post("/create-order", checkLogin, async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest()
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

    request.prefer("return=representation")
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2),
              },
            },
          },
          items: req.body.items.map(item => {
            const storeItem = products.find(p => p._id.toString() === item.id)
            return {
              name: storeItem.title,
              unit_amount: {
                currency_code: "USD",
                value: storeItem.price.toFixed(2),
              },
              quantity: item.quantity,
            }
          }),
        },
      ],
    })
  
    try {
      const order = await paypalClient.execute(request)
      res.json({ orderID: order.result.id,id:savedOrder._id })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  module.exports  = router;