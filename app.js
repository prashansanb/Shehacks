var express = require('express');
var ejs = require('ejs');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

var NGO = mongoose.model("NGO", ngoSchema);

var form = mongoose.model("form",formSchema);
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

})
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"))


 app.set('port', process.env.PORT || 3000);
 app.listen(3000, function(){
   console.log("the server has started");
 });
