const mongoose = require('mongoose');
const { isValidEmail } = require('./validate');

const employeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        validate: [{ validator: value => isValidEmail(value), message : 'Invalid email address' }],
    },
    position: {
        type: String 
    },
    office : {
        type: String
    },
    salary : {
        type: Number
    }
});

module.exports = mongoose.model('Employee', employeeSchema);