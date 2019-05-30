const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const keys = require('./config/keys');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
  //allows a web service to specify that it's OK for it to be invoked from any domain
  res.header("Access-Control-Allow-Origin", "*");
  //browser sends an OPTIONS request before sending POST
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);
app.use(cors());
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    //graphql playground
    graphiql: true
  })
);
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {

})
  .then(() => {
    app.listen(5000);
    console.log("Listening on Port: 5000")
  })
  .catch(err => console.log("Error connecting to mongo: ", err)
  );
mongoose.connect(
  `mongodb+srv://bchristy:07691bcb@cluster0-yjbmp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true }
)
// .then(() => {
// app.listen(5000);
// })
// .catch(err => {
//   console.log(err);
// });

// mongoose.connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${
//       process.env.MONGO_PASSWORD
//     }@cluster0-uagfb.mongodb://localhost:27017/?gssapiServiceName=mongodb/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true }
//   )
// .then(() => {
//   app.listen(5000);
// })
//   .catch(err => {
//     console.log(err);
//   });
