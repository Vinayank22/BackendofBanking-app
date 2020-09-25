const db = require('./db')

accountDetails = {

  1001: { name: "user1", acno: 1001, pin: 4387, password: "userone", balance: 3000, transactions: [] },
  1002: { name: "user2", acno: 1002, pin: 1234, password: "usertwo", balance: 3000, transactions: [] },
  1003: { name: "user3", acno: 1003, pin: 4567, password: "userthree", balance: 3000, transactions: [] },
  1004: { name: "user4", acno: 1004, pin: 5678, password: "userfour", balance: 3000, transactions: [] },
  1005: { name: "user5", acno: 1005, pin: 6789, password: "userfive", balance: 3000, transactions: [] }

}
let currentUser

const register = (name, acno, pin, pwd) => {
  return db.User.findOne({
    acno
  })
    .then(user => {
      if (user) {

        return {
          result: false,
          statusCode: 422,
          message: "Account already exists"
        }

      }

      const newUser = new db.User({

        name,
        acno,
        pin,
        password: pwd,
        balance: 0,
        transactions: []

      });
      newUser.save()
      return {
        result: true,
        statusCode: 200,
        message: "Account created Please login"
      }

    })
  if (acno in accountDetails) {

    return {
      result: false,
      statusCode: 422,
      message: "Account already exists"
    }
  }
  accountDetails[acno] = {
    name,
    acno,
    pin,
    password: pwd,
    balance: 0,
    transactions: []


  }
  return {
    result: true,
    statusCode: 200,
    message: "Account created Please login"
  }
}
const login = (req, acno1, pwd) => {
  //console.log(abc.value);
  //console.log(defg.value)// Template Referencing
  var acno = parseInt(acno1);
  return db.User.findOne({
    acno,
    password: pwd
  })
    .then(user => {
      if (user) {
        req.session.currentUser = acno;
        return {
          status: true,
          statusCode: 200,
          message: "Login Success",
          name:user.name
        }
      }
      return {
        status: false,
        statusCode: 422,
        message: "Invalid credentials"
      }
    })
}


// var data = accountDetails;
//console.log(acno in data);
//req.session.currentUser = data[acno];
// console.log(req.session.currentUser)
// if (acno in data) {
// let pd = data[acno].password
//console.log(pd);
// if (pd == pwd) {
//this.currentUser = data[acno];
//this.setDetails();
// return {
// status: true,
// statusCode: 200,
// message: "Login Success"
// }

// }
// }
// return {
// status: false,
// statusCode: 422,
// message: "Invalid credentials"
// }



const deposit = (acno1, pp, amt) => {


  var acc = parseInt(acno1);
  return db.User.findOne({
    acno: acc,
    pin: pp
  })
    .then(user => {
      //req.session.currentUser = acno;
      if (!user) {
        return {
          status: false,
          statusCode: 422,
          message: "Invalid credentials"
        }
      }
      user.balance += parseInt(amt);
      user.transactions.push({

        amount: amt,
        typeOfTransactions: "Credit",
        Accountnum: acc,
        //id: Math.floor(Math.random() * 10000)

      });
      user.save();
      return {
        status: true,
        statusCode: 200,
        message: "Amount has been credited",
        Balance: user.balance
      }
    });
}
//////////////////////]}
//var pp=this.dashboardForm.value.pin;
//var amt = parseInt(amd);
//console.log(amt);

//ar details = accountDetails

//if (acc in details) {


//console.log(acc);
//let mpin = details[acc].pin;
//console.log(mpin);
//var bal = details[acc].balance;
// console.log(bal);
//var bala = parseInt(bal);
// console.log(bala);
//if (pp == mpin) {
//details[acc].balance += parseInt(amt);
//details[acc].transactions.push({

// Amount: amt,
//Type: "Credit",
//Accountnum:acc,
//id:Math.floor(Math.random()*10000)

//})
//console.log(details[acc].transactions)



//console.log(res);
//this.setDetails();

//return {
//status: true,
//statusCode: 200,
//message: "Amount has been credited",
//Balance: details[acc].balance
//}

//}


//}
//else
//return {
//status: false,
//statusCode: 422,
//message: "Invalid credentials"

// }
//}


const withdraw = (acno1, pi, amt) => {
  var acnt = parseInt(acno1);
  //var pi=this.dashboardForm.value.pin;
  var amd = parseInt(amt)
  return db.User.findOne({
    acno: acnt,
    pin: pi
  })
    .then(user => {
      //req.session.currentUser = acno;
      if (!user) {
        return {
          status: false,
          statusCode: 422,
          message: "Invalid credentials"
        }
      }
      if (user.balance < amd) {
        return {
          status: false,
          statusCode: 422,
          message: "Insufficient Balance",
          Balance: user.balance

        }
      }
      user.balance -= amd;
      user.transactions.push({
        amount: amd,
        typeOfTransactions: "debit",
        Accountnum: acnt,
        //id: Math.floor(Math.random() * 10000)
      });
      user.save();
      return {
        status: true,
        statusCode: 200,
        message: "Amount has been debited",
        Balance: user.balance
      }

    })
}



//let db = accountDetails;

//if (acnt in db) {
//console.log(acnt);

//let wpin = db[acnt].pin;
//if (db[acnt].balance < amd)
//return {
//status: false,
//statusCode: 422,
//m//essage: "Insufficient Balance",
//B//alance: db[acnt].balance

//}//

// if (pi == wpin) {
//db[acnt].balance -= amd;
// db[acnt].transactions.push({
//Amount: amd,
//Type: "debit",
//Accountnum: acnt,
//d: Math.floor(Math.random() * 10000)
//})
//console.log(db[acnt].transactions)

//this.currentUser = db[acnt].balance;
//this.setDetails();
//return {
//status: true,
//statusCode: 200,
//message: "Amount has been debited",
//Balance: db[acnt].balance
//}

//}
//else {
// r//eturn {
//staus: false,
//statusCode: 422,
//m//essage: "insufficent  balance"

//}
//}
//}
//}
const getTransactionDetails = (req) => {
  return db.User.findOne({
    acno: req.session.currentUser

  })
    .then(user => {
        return {
          status: true,
          statusCode: 200,
          transactions: user.transactions
        }
      });
}

const deleteTansaction = (req, id) => {
  return db.User.findOne({
    acno: req.session.currentUser

  })
  //let transactions = accountDetails[req.session.currentUser.acno].transactions;
  .then(user => {
  user.transactions = user.transactions.filter(t => {

    if (t._id == id) {
      return false;
    }
    else {
      return true;
    }
  })
  user.save();
  //accountDetails[req.session.currentUser.acno].transactions = transactions;
  return {
    staus: true,
    statusCode: 200,
    message: "Transaction history deleted"

  }

})
}








module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransactionDetails,
  deleteTansaction
}
