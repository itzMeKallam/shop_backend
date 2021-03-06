const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
// import Admin Routers
const adminSignupRoute = require('./routes/admin/signup')
const adminSigninRoute = require('./routes/admin/signin')
const adminAddProducts = require('./routes/admin/addProducts')
const adminViewProducts = require('./routes/admin/viewProducts')

// Services
app.use(bodyParser.json())
bodyParser.urlencoded({ extended: true })

// Routers
app.use(cors())
app.use('/admin/signup/', adminSignupRoute)
app.use('/admin/signin/', adminSigninRoute)
app.use('/admin/addProducts/', adminAddProducts)
app.use('/admin/viewProducts/', adminViewProducts)



const MONGODB_URI =
  'mongodb+srv://kallam:itzmekallamvenkatesh@cluster0.a1to0.mongodb.net/store?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(8080, ()=>{
        console.log('server is listening')
    });
  })
  .catch(err => {
    console.log(err);
  });



