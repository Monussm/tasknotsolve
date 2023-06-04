const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs")
const port=process.env.process || 3000;
const mypublic=path.join(__dirname,"../public");
const partials=path.join(__dirname,"../partials");
app.use(express.urlencoded({extended:false}));
app.use(express.static(mypublic))
app.set("view engine","hbs")
hbs.registerPartials(partials);
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://monug1513:monu1234@cluster10.7s4raqs.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    emailid:String,
    mobilenumber:String,
    password:String,
    newpassowrd:String,
    confirmpassword:String
    
});
  const User = mongoose.model('User',userSchema);




const mydaySchema = new mongoose.Schema({
    task:String,
    emailid:String
    
});
  const Myday = mongoose.model('Myday',mydaySchema);


//Login router here
app.get("/",async(req,res)=>{
// const params={}
res.render("index")


})
app.post("/",async(req,res)=>{
const emailid=req.body.emailid
const password=req.body.password
const match=await User.findOne({emailid})
if(match==null){

const notauthorised="You are not authorised user please signup"
res.render("index",{notauthorised})


}
else{
   
  if(match.emailid===emailid){
    if(match.password==password){
    
      res.render("todo",{match})
    
    
    }
    else{
    
    const confirmpassworderro="Email & Password Not match"
     res.render("index",{confirmpassworderro})
    
    }
    }

}
})


//forget router here
app.get("/forget",(req,res)=>{

res.render("forget")


})
app.post("/forget",async(req,res)=>{
const newpassword=req.body.newpassword
// console.log(newpassword)
const emailid=req.body.emailid
const update=await User.findOne({emailid})
if(update==null){


console.log("emailid not present")
res.render("signup")

}
else{
  if(update.emailid===emailid){

    const update=await User.findOneAndUpdate({emailid},{$set:{password:newpassword}})
    res.render("index")
    
    
  }
   
}




})


//Sigup router here
app.get("/signup",async(req,res)=>{
res.render("signup")
  
})

app.post("/signup",async(req,res)=>{

const password=req.body.password
const confirmpassword=req.body.confirmpassword
const emailid=req.body.emailid
const data=await User.findOne({emailid})
if(data==null){
  if(password!==confirmpassword){
    const error="Confirmpassword & Password not match"
    res.render("signup",{error})
    
    }
    else{
      const user=new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        emailid:req.body.emailid,
        mobilenumber:req.body.mobilenumber,
        password:req.body.password,
        
        })
        await user.save()
        res.render("index")
    }
}
else{

const emailerror="Email id already present"
res.render("signup",{emailerror})



}



})


app.get("/todo",(req,res)=>{

res.render("todo")


})
app.get("/myday",async(req,res)=>{
const params={}
res.render("myday")


})
app.post("/myday",async(req,res)=>{
  const emailid=req.body.found
  const found=await User.findOne(emailid)
  console.log(found)
//   const emailid2=await 
//   console.log(found)
// const myday=new Myday({
//   task:req.body.task,
//  emailid:found.emailid
  
//   })
// await myday.save()
// res.render("index")
// console.log(myday)
// res.send("successful")


})






app.listen(port,(req,res)=>{

console.log("App Running on port 3000")

})