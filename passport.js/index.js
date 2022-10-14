
// require('dotenv').config();
const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const session = require("express-session")
const passport = require("passport")
const LocalStractegy = require('passport-local').Strategy;
const app = express()

mongoose.connect("mongodb://localhost:27017/NewDB",{useNewUrlParser:true})

const userSchema = new Schema({
    username:{type:String},
    password:Number,
    name:String,
})


const User = mongoose.model("User",userSchema)

// app.use(express.static(process.env.STATIC_FOLDER))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,maxAge:6000}
}))


app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStractegy(
    function(username,password,done){
        console.log(username,password)
        User.findOne({username:username},function(err,user){
            if(err) return done(err);
            if(!user){
                return done(null,false,{message:'Incorrect username'});
            }
            if(!user.password==password){
                return done(null,false,{message:"Incorrect Password"});

            }
            console.log(user)
            return done(null,user)
        })
    }
))

passport.serializeUser((user,done)=>{
    if(user){
        return done(null,user.id)
    }
    return done(null,false)
})
passport.deserializeUser((id,done)=>{
User.findById(id,(err,user)=>{
    if(err) return done(null,false)
    return done(null,user)
})
})








app.get("/test",isAuthenticated,(req,res)=>{
    req.session.test?req.session.test++:req.session.test=1;
    res.send(req.session.test.toString()+" "+req.user.username)
})


app.post("/signup",(req,res,done)=>{
    console.log("maidn")
    User.findOne({username:req.body.username},(err,user)=>{
        console.log("maidn")
        if(err){ done (null,false);
        console.log("maidn")}
        else if(user) {res.send("/kodvov") 
        console.log("ajfninf")}
        else{
       
            User.create({username:req.body.username,password:req.body.password},(err,user)=>{
                 if(err) {done(null,false)
                console.log(err.message)}
                 done(null,user)
            })
        }
    })
})






app.post("/logout",(req,res)=>{
    // res.write("enter")
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send('logged out');
      });
    // res.send("logged out")
})

function isAuthenticated(req,res,done){
    if(req.user){
 return done()
    }
    return res.redirect('/')
}

app.post('/login',
passport.authenticate('local'),
function(req,res){
    res.json(req.user)
})









// const app = express()

// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

// app.get('/', (req, res) => res.send('hello'))

app.listen(8080, () => {console.log('server started on port 8080')})