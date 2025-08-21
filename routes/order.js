const router = require("express").Router();
const Order = require("../models/order");

router.get("/", (req, res, next) => {
  Order.find({})
    .then((orders) => {
      res.status(200).json({
        message: "Orders fetched successfully",
        orders: orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post("/addOrder", (req, res, next) => {
  const order = new Order({
    user: req.body.user,
    product: req.body.product,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order added successfully",
        order: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.patch("/updateOrder/:orderId", (req, res, next) => {
  var newProduct = req.body.product;
  Order.find({ _id: req.params.orderId })
    .then((order) => {
      var oldProduct = order[0].product;

      for (let i = 0; i < newProduct.length; i++) {
        for (let j = 0; j < oldProduct.length; j++) {
          if (newProduct[i]._id === oldProduct[j]._id) {
            oldProduct[j].Quantity += newProduct[i].Quantity;
            newProduct.splice(i, 1);
            break;
          }
        }
      }

      oldProduct = oldProduct.concat(newProduct);
      console.log(oldProduct);
      const newOrder = {
        user: order[0].user,
        product: oldProduct,
      };
      Order.updateOne({ _id: req.params.orderId }, {$set: newOrder})
      .then(result => {
        res.status(201).json({
          message: "Order updated successfully",
          order: result,
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err.message,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.delete('/:orderId', (req, res, next) => {
  Order
  .deleteOne({_id: req.params.orderId})
  .then(result => {
    res.status(200).json({
      message: "Order deleted successfully",
      result: result,
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
    });
  });
});

module.exports = router;
