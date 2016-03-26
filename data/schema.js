import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';


const Schema = (db) => {
    let store = {};

    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
          links: {
              type: new GraphQLList(linkType), // type of the field you are asking for
              resolve: () => db.collection('links').find({}).toArray(), // this fnc will exc when a query asks for the field
          },
        }),
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            _id: { type: GraphQLString },
            title: { type: GraphQLString },
            url: { type: GraphQLString },
        }),
    });

    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store,
                },
            }),
        }),


    });

    return schema;
};

export default Schema;
