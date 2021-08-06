const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const PORT = process.env.PORT || 4000

//graphql instance
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))

app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
})