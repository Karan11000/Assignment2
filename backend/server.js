const express = require("express")
const app = express();
const mongoose = require("mongoose")
const validatePhoneNumber = require('validate-phone-number-node-js');
const personal = require("./models/person");
const click = require("./models/click");

mongoose.connect("mongodb+srv://karan:Karan1234@cluster0.whxd0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected Sucessfully");
})
.catch((err)=>{
    console.log(err);
    throw new Error(err);
})

app.use(express.json());



app.get("/api", async (req, res)=>{
    const results = await personal.find();
    const clickResults = await click.findOne({});
    const data = {results, clickResults};
    res.send(data);
})

app.post('/api', async (req, res)=>{
    const {name, email, number, type} = req.body;
    console.log(name, email, number, type);
    if(!name || !email || !number){
        throw new Error("Enter all the fields");
    }
    for(let i = 0; i<name.length; i++){
        if(!((name[i]>= 'a' && name[i]<='z')||(name[i]>='A' && name[i]<='Z'))){ 
            throw new Error("Enter a Valid Name");
        }
    }
  if(!validatePhoneNumber.validate(number)){
      throw new Error("Enter a valid Phone Number");   
  }
  const resu = await click.findOne({});
  const id = resu._id;
          const update = await click.findByIdAndUpdate(
              id, 
              {
                  addClicks : resu.addClicks + 1,
                  updateClicks : resu.updateClicks
              },
              {
                  new : true
              }
          )
    await personal.create({name: name, email: email, mobile:number});

    res.redirect('/api');
})

app.put('/api', async (req, res)=>{
    const {nameUpd, emailUpd, numberUpd, type} = req.body;
    console.log(nameUpd, emailUpd, numberUpd, type);
    if(!nameUpd){
        throw new Error("Enter the name of the Person whose detail You want to update");
    }
    for(let i = 0; i<nameUpd.length; i++){
        if(!((nameUpd[i]>= 'a' && nameUpd[i]<='z')||(nameUpd[i]>='A' && nameUpd[i]<='Z'))){ 
            throw new Error("Enter a Valid Name");
        }
    }
  if(!validatePhoneNumber.validate(numberUpd)){
      throw new Error("Enter a valid Phone Number");   
  }
  const resu = await click.findOne({});
  const id = resu._id;
          const update = await click.findByIdAndUpdate(
              id, 
              {
                  addClicks : resu.addClicks,
                  updateClicks : resu.updateClicks + 1
              },
              {
                  new : true
              }
          )

    const value = await personal.findOne({name : nameUpd});
    const id1 = value._id;
    const update1 = await personal.findByIdAndUpdate(
        id1,
        {
            name : value.name,
            email : emailUpd?emailUpd:value.email,
            mobile : numberUpd?numberUpd:value.mobile
        },
        {
            new : true
        }
    )
    res.redirect('/api');
})

app.listen(5000); 