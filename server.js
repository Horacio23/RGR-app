import express from 'express';
import { MongoClient } from 'mongodb';
import graphQLHTTP from 'express-graphql';
import schema from './data/schema';
const app = express();

// ES-2015 Syntax: Arrow Functions
// app.get('/', (req, res) => res.send('helasdlo express'));
app.use(express.static('public'));

( async () => {
  let db = await MongoClient.connect('mongodb://localhost:27017/rgrjs');

  app.use('/graphql', graphQLHTTP({
      schema: schema(db),
      graphiql: true,
  }));

  app.listen(3000, () => {
      console.log('Listening on port 3000');
  });

})();
