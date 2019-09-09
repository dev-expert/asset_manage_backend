const Express = require("express");
const graphqlHTTP=require('express-graphql');
const Mongoose = require("mongoose");
const schema=require("./schema/schema");
var cors = require('cors');
const path = require('path');

var app = Express();

//Mongoose.connect("mongodb://localhost:27017/manage_asset", { useNewUrlParser: true });
// connect to mongodb
Mongoose.connect("mongodb://localhost:27017/assetdb", { useNewUrlParser: true }, function (error) {
    if (error) {
     console.log('Could not connect to DB: %s', error);
    }
   });

app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
  }));

  app.use(Express.static('public'))
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'public','index.html'))
  })

app.listen(Process.env.PORT, () => {
    console.log("Listening at :5000...");
});