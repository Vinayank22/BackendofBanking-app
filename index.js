const express= require('express')
const dataservice= require('./services/dataservice')
const app= express();
const session=require('express-session');
const cors= require('cors')

app.use(cors({
    origin:'http://localhost:4200',
    cresentials:true
}))
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
     dataservice.register(req.body.name,req.body.acno,req.body.pin,req.body.pwd)
     .then(result=>{

        res.status(result.statusCode).json(result);
     })
     
})
app.post('/login',(req,res)=>{
    dataservice.login(req,req.body.acno1,req.body.pwd)
    .then(result=>{
   res.status(result.statusCode).json(result);
    })
})
app.post('/deposit', authMiddlewear,(req,res)=>{
    //console.log(req.session.currentUser)
    dataservice.deposit(req.body.acno,req.body.pin,req.body.amt)
    .then(result=>{
   res.status(result.statusCode).json(result);
    })
})
app.post('/withdraw', authMiddlewear,(req,res)=>{
    dataservice.withdraw(req.body.acno,req.body.pin,req.body.amt)
    .then(result=>{
     res.status(result.statusCode).json(result);
    })

})
app.get('/transactionHistory', authMiddlewear,(req,res)=>{
dataservice.getTransactionDetails(req)
.then(result=>{
res.status(200).json(result);
})
})
app.delete('/transactionHistory/:id', authMiddlewear,(req,res)=>{
    //console.log(req.params.id)
    dataservice.deleteTansaction(req,req.params.id)
    .then(result=>{
     res.status(200).json(result);
    })
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
