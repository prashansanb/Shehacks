var express = require('express');
var ejs = require('ejs');
var app = express();
var paypal = require('paypal-rest-sdk');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AdS2CHNXhJyQu9Pk85CuQJccBLTDRvLbtBHmUNxF6li2qmLQhhgUAZOENj69glXj3KDcgu78nmHOHUaA',
  'client_secret': 'EM5shg6NZLo-pFW_nmh_1PPprXPMyKSaS6gf3z7Mb2xzC50aadZg0xFxM5rbKN18_vJIm7pOetVsvtOw'
});

// let ejs = require('ejs-html')
//
// let html = ejs.render('<input type="text" disabled="<%=disabled%>" value="<%=value%>" />', {
//     disabled: false,
//     value: 'hi you'
// }, {
//     vars: ['disabled', 'value']
// });

mongoose.connect("mongodb://localhost:27017/ngo_s", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema
var ngoSchema = new mongoose.Schema({
  name: String,
  currentBal: Number
});

var userSchema = new mongoose.Schema({
  address:String,
  amount: Number
});

var formSchema = new mongoose.Schema({
  name:String,
  email:String,
  phone:String,
  why:String,
  time:String
});

var adoptionFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: Number,
  address: String,
  famMembers: Number,
  maritalStatus: String,
  children: Number,
  income: Number,
  reason: String
});

var petadoptionSchema = new mongoose.schema({
  name: String,
  email: String,
  phoneNo: Number,
  address: String,
  famMembers: Number,
  maritalStatus: String,
  pets: Number,
  income: Number,
  reason: String
});

var NGO = mongoose.model("NGO", ngoSchema);

var form = mongoose.model("form",formSchema);
var adoptionForm = mongoose.model("adoptionForm", adoptionFormSchema);
var petAdoptionForm = mongoose.model("petAdoptionForm", petadoptionSchema);
var user = mongoose.model("user", userSchema);
// NGO.create(
//   {
//     name:"LET THEM FLY",
//     currentBal:5000
//   }, function(err, NGO){
//     if(err){
//       console.log(err);
//     } else{
//       console.log("listed NGO");
//       console.log(NGO);
//     }
// });

var ngos = [
  {name:"SAMMAAN FOUNDATION",currentBal:10000},
  {name:"GOONJ", currentBal:8000},
  {name:"AKSHAYA TRUST", currentBal:5000},
  {name:"SMILE FOUNDATION", currentBal:9856},
  {name:"UDAAN WELFARE FOUNDATION",currentBal:11000}
];
app.use(express.static(__dirname + '/views'));
app.get("/", function(req,res){
  // res.render("index.ejs");
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', null, function(error, data){
    if(error){
      console.log(error);
    }
    else{
      res.write(data);
        }
        res.end();
  })
});

app.post("/face", function(req,res){
  console.log(fname+" "+lname);

})

app.get("/volunteer", function(req,res){
  res.render("volunteer.ejs");
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // fs.readFile('./index.html', null, function(error, data){
  //   if(error){
  //     console.log(error);
  //   }
  //   else{
  //     res.write(data);
  //       }
  //       res.end();
  // })
});

app.post("/adopt", function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var phoneNo = req.body.phoneNo;
  var address = req.body.address;
  var famMembers = req.body.famMembers;
  var maritalStatus = req.body.maritalStatus;
  var children = req.body.children;
  var income = req.body.income;
  var reason = req.body.reason;

  var newAdoption = {
    name: name,
    email: email,
    phoneNo: phoneNo,
    address: address,
    famMembers: famMembers,
    maritalStatus: maritalStatus,
    children: children,
    income: income,
    reason: reason
  }

  adoptionForm.create(newAdoption, function(err, newlycreated){
    if(err){
      console.log(err);
    } else{
      res.redirect("/");
    }
  });
});

app.post("/petAdoption", function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var phoneNo = req.body.phoneNo;
  var address = req.body.address;
  var famMembers = req.body.famMembers;
  var maritalStatus = req.body.maritalStatus;
  var pets = req.body.pets;
  var income = req.body.income;
  var reason = req.body.reason;

  var newAdoption = {
    name: name,
    email: email,
    phoneNo: phoneNo,
    address: address,
    famMembers: famMembers,
    maritalStatus: maritalStatus,
    pets: pets,
    income: income,
    reason: reason
  }

  petAdoptionForm.create(newAdoption, function(err, newlycreated){
    if(err){
      console.log(err);
    } else{
      res.redirect("/");
    }
  });
});

app.get("/adoption", function(req,res){
  res.render("adoption.ejs");
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // fs.readFile('./index.html', null, function(error, data){
  //   if(error){
  //     console.log(error);
  //   }
  //   else{
  //     res.write(data);
  //       }
  //       res.end();
  // })
});
app.get("/petadoption", function(req,res){
  res.render("petadoption.ejs");
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // fs.readFile('./index.html', null, function(error, data){
  //   if(error){
  //     console.log(error);
  //   }
  //   else{
  //     res.write(data);
  //       }
  //       res.end();
  // })
});
app.get("/ngos", function(req,res){
  NGO.find({}, function(err, allngos){
    if(err){
      console.log(err);
    }
    else{
      // res.writeHead(200, {'Content-Type': 'text/html'});
      // fs.readFile('./ngos.html', null, function(error, data){
      //   if(error){
      //     console.log(error);
      //   }
      //   else{
      //     res.write(data);
      //       }
      //       res.end();
      // })
      res.render("ngos.ejs");
     }
  });
});

app.get("/:ngoname/transactions", function(req,res){
  res.render("transactions.ejs",{
    name:req.params.ngoname
  });
});

app.get("/pay", function(req,res){
  // fs.readFile('./pay.html', null, function(error, data){
  //   if(error){
  //     console.log(error);
  //   }
  //   else{
  //     res.write(data);
  //       }
  //       res.end();
  // })
  res.render('pay.ejs');
});

app.post("/user", function(req,res){
  var username = req.body.name;
  var email = req.body.email;
  var amount = req.body.amount;
  // var newUser = {
  //   name: username,
  //   address:email,
  //   amount:amount
  // }
  // user.create(newUser, function(err, newUser){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     res.redirect("/pay");
  //   }
  // })
});


app.get("/abc", function(req, res){
  res.render('paypal.ejs');
})

app.post("/paypal",function(req, res){
  var amt = req.params.amount;
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "amount": {
            "currency": "INR",
            "total": "5.00"
        },
        "description": "Donation"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(var i = 0; i < payment.links.length; i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
});

});

app.post("/details", function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var why = req.body.why;
  var time = req.body.time;
  var newForm = {
    name:name,
    email:email,
    phone:phone,
    why:why,
    time:time 
  }
  form.create(newForm, function(err, newForm){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/");
    }
  })

});
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"))

app.get('/success', function(req, res){
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "INR",
            "total": "5.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        res.send('Success');
    } 
});
});


app.get('/cancel', function(req, res){
  res.send("Cancelled");
})

 app.set('port', process.env.PORT || 3000);
 app.listen(3000, function(){
   console.log("the server has started");
 });
