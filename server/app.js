const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors')
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000
const cloudURL =
  "mongodb+srv://nikhilpark:Nklplp12@@blog.ngngn.mongodb.net/gqlblackbelt?retryWrites=true&w=majority";

mongoose
  .connect(cloudURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("error"));


//graphql instance
app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))

app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
})