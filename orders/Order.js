const mongoose = require('mongoose')

mongoose.model("Order", {
  CustomerID: {
    type: mongoose.SchemaType.ObjectId,
    required: true
  },
  BookID: {
    type: mongoose.SchemaType.ObjectId,
    required: true
  },
  initialDate: {
    type: Date,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
})