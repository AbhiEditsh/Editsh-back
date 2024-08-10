// resume.js

const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoImage: {
    type: String,
  },
});

const Clients = mongoose.model("Client", ClientSchema);

module.exports = Clients;
