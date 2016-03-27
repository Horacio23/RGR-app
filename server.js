import fs from 'fs';
import express from 'express';
import { MongoClient } from 'mongodb';
import graphQLHTTP from 'express-graphql';
import Schema from './data/schema';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

const app = express();

// ES-2015 Syntax: Arrow Functions
// app.get('/', (req, res) => res.send('helasdlo express'));
app.use(express.static('public'));

( async () => {
  try{
    console.log('Starting the server');

    let db = await MongoClient.connect('mongodb://localhost:27017/rgrjs');
    let schema = Schema(db);
    app.use('/graphql', graphQLHTTP({
        schema,
        graphiql: true,
    }));

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });

    // This doesnt have to be here since it will be generated every time the server runs but w.e
    // Generate schema.json for Relay.
    const json = await graphql(schema, introspectionQuery)
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
      if (err) throw err;

      console.log('JSON schema created');
    });
  } catch(e){
    console.log(e);
  }
})();
