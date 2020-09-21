const express= require('express')
const dataservice= require('./services/dataservice')
const app= express();
const session=require('express-session');

app.use(session({
    secret: 'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));
app.use(express.json())
const logMiddlewear=(req,res,next) =>{
    console.log(req.body)
    next();

}
app.use(logMiddlewear);
const authMiddlewear= (req,res,next)=>{
    if(!req.session.currentUser)
    {
        return res.json({
            status:false,
            statusCode:401,
            message:"Not authenticated please login",
        
          })
  
    }else{
        next();
    }
}


app.get('/',(req,res)=>{

    res.send("helloworld nodemon");
})
app.post('/register',(req,res)=>{
     const result=dataservice.register(req.body.name,req.body.acno,req.body.pin,req.body.pwd)
     res.status(result.statusCode).json(result);
})
app.post('/login',(req,res)=>{
    const result=dataservice.login(req,req.body.acno1,req.body.pwd)
   res.status(result.statusCode).json(result);
})
app.post('/deposit', authMiddlewear,(req,res)=>{
    //console.log(req.session.currentUser)
    const result=dataservice.deposit(req.body.acno,req.body.pin,req.body.amt)
   res.status(result.statusCode).json(result);

})
app.post('/withdraw', authMiddlewear,(req,res)=>{
    const result=dataservice.withdraw(req.body.acno,req.body.pin,req.body.amt)
   res.status(result.statusCode).json(result);

})
app.get('/transactionHistory', authMiddlewear,(req,res)=>{
const result=dataservice.getTransactionDetails(req)
res.status(200).json(result);
})
app.delete('/transactionHistory/:id', authMiddlewear,(req,res)=>{
    //console.log(req.params.id)
    const result=dataservice.deleteTansaction(req,req.params.id)
     res.status(200).json(result);
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
