const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/userRoute');
const connectdb=require('./config/db');

require('dotenv').config({
    path:'./config/config.env'
});
connectdb();
const app=express();
const PORT=process.env.PORT;
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan('dev'));
}

app.use('/api',userRoutes);

app.use((req,res,next)=>{
    res.status(400).json({
        success:false,
        message:'Not Found page'
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
});