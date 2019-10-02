const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//Allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://ryan:test1234@graphqlplaylist-piu9f.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  console.log('Connected to database.')
})

app.use('/graphql', graphqlHTTP({
  schema, //Defining graphql graph and object types on that graph
  graphiql: true
}));

app.listen(4000,() => {
  console.log('Listening on port 4000...');
});
