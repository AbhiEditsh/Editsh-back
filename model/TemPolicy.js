const mongoose = require('mongoose');

const TermPolicySchema = new mongoose.Schema({

  Term: {
    type: String,
  },
  Policy: {
    type: String,
  }
});

const Termpolicy = mongoose.model('TermPolicy', TermPolicySchema);

module.exports = Termpolicy;