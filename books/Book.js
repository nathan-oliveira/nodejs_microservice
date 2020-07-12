const mongoose = require("mongoose");

mongoose.model("Book", {
  title: {
    type: String,
    required : true,
  },
  author: {
    type: String,
    required : true,
  },
  numberPages: {
    type: String,
    required : true,
  },
  publisher: {
    type: String,
    required : true,
  }
})