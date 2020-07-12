const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/customersservice", () => {
  console.log("Database is connected => Customers")
})

require("./Customer")
const Customer = mongoose.model("Customer")

app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  }

  var customer = new Customer(newCustomer);
  customer.save()
    .then(() => {
      res.send("new customer created!");
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers)
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.get("/customers/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if(customer) {
        res.json(customer)
      } else {
        res.rend("Invalid  ID!");
      }
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.delete("/customers/:id", (req, res) => {
  Customer.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Customer removed with success!");
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
})

app.listen(5555, () => {
  console.log("API ON => Customers")
})