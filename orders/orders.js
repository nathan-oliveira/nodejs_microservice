const express = require("express")
const app  = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")

app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/ordersservice", () => {
  console.log("Database connected - Orders")
})

require("./Order")
const Order = mongoose.model("Order")

app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  }

  const order = new Order()
  order.save(newOrder)
    .then(() => {
      res.send("Order created with success!")
    })
    .catch((err) => {
      if(err) {
        throw err
      }
    })
})

app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders)
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if(order) {
        axios.get(`http://localhost:5555/customers/${order.CustomerID}`)
          .then((response) => {
            let orderObject = {
              customerName: response.data.name,
              bookTitle: '',
            }

            axios.get(`http://localhost:4545/book/${order.BookID}`)
              .then((response) => {
                orderObject.bookTitle = response.data.title
                res.json(orderObject)
              })

          })
      } else {
        res.send("Invalid Order")
      }
    })
})

app.listen(777, () => {
  console.log("API ON => Orders service");
});
