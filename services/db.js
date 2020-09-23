const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Bank_server',{

    useNewUrlParser:true,
    UseUnifiedTopology:true

})
const User= mongoose.model('User',{
   
    name: String,
    acno: Number,
    pin: Number,
    password: String,
    balance: Number,
    transactions:[{
        amount: Number,
        typeOfTransactions: String
    }]


    
},"Users");


module.exports = {
    User
}

