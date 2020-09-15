const express= require('express')
const dataservice= require('./services/dataservice')
const app= express();

app.use(express.json())


app.get('/',(req,res)=>{

    res.send("helloworld nodemon");
})
app.post('/register',(req,res)=>{
     const result=dataservice.register(req.body.name,req.body.acno,req.body.pin,req.body.pwd)
     res.status(result.statusCode).json(result);
})
app.post('/login',(req,res)=>{
    const result=dataservice.login(req.body.acno1,req.body.pwd)
   res.status(result.statusCode).json(result);
})
app.put('/',(req,res)=>{

    res.send("put methd");
})
app.patch('/',(req,res)=>{

    res.send("patch methd");
})
app.delete('/test',(req,res)=>{

    res.send("delete methd");
})
app.listen(4000,()=>{
    console.log("server started at port 4000")
})
