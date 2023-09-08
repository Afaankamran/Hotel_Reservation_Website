var express=require("express");
const { Collection } = require("mongoose");
bodyParser=require("body-parser");
const path=require("path");
const hbs=require("hbs");


const static_path=path.join(__dirname,"public");
const view_path=path.join(__dirname,"views");
const partials_path=path.join(__dirname,"partials");
hbs.registerPartials(partials_path);
 //DataBase Connection
mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/hms');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()
app.set('view engine', 'hbs');
app.set('views', view_path);
app.set('partials',partials_path);
app.set('public',static_path);



 

 
app.use(express.static(static_path));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
// Handling register functionality

app.post('/register', function(req,res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email =req.body.email;
	var gender = req.body.gender;
	var phone =req.body.phone;
	var gender = req.body.gender;
	var password = req.body.password;
	var confirmpassword = req.body.confirmpassword;
	

	var data = {
		fname,
		lname,
		email,
		gender,
		phone,
		gender,
		password,
		confirmpassword
		
	}
	db.collection('register').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
      
    });
		
	return res.render('index');
})



// Handling Contact Us functionality

app.post('/contact', function(req,res){
	var name = req.body.name;
	var query = req.body.query;
	var email =req.body.email;
	var contact =req.body.contact;

	var data1 = {
		 name,
		 query,
		email,
		contact
	}

db.collection('contactus').insertOne(data1,function(err, collection){
	if (err) throw err;
	console.log("feedback inserted Successfully");
	
		  
});
	
return res.render('index');
})

/*// Handling login functionality

app.post('/login', function(req,res){
	var password = req.body.password;
	var email =req.body.email;
	

	

db.collection('register').findOne({email:email},{password:password},function(err, collection){
	if (err) throw err;
	else
	{
		console.log("login Successfully");
	}
	
		  
});
	
return res.render('login_success.ejs');
})*/


// Handling login functionality
app.post('/login',async(req,res)=>{
try{
	var email=req.body.email;
	var password=req.body.password;

	var useremail= await collection.findOne({email:email.password});
	
	if(useremail.password===password)
	{
		 return  res.render('index');
		
	}
	}
	catch(error)
	{
      return res.send("invalid details");
	}	
	})
	
	
	
// Show Home Page on server	

app.get('/',function(req,res)
{
	res.render('index');
})
// Show Signup Page on server	
app.get('/register',function(req,res)
{
	res.render('register');
})
// Show Login Page on server	
app.get('/login',function(req,res)
{
	res.render('login');
})
// Show Contact Us Page on server	
app.get('/contact',function(req,res)
{
	res.render('contact');
})
// Show Checkout Page on server	
app.get('/checkout',function(req,res)
{
	res.render('checkout');
})
// Show booking Page on server	
app.get('/booking',function(req,res)
{
	res.render('booking');
})


.listen(8079);

console.log("server is listening port:8079");



