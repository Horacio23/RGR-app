import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';

import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
} from 'graphql-relay';
const Schema = (db) => {
    let store = {};


    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
          linkConnection: {
              type: linkConnection.connectionType,
              args: connectionArgs, // first, last .... etc
              resolve: (_, args) => connectionFromPromisedArray(
                db.collection('links').find({}).toArray(), // this fnc will exc when a query asks for the field
                args
              ),
          },
        }),
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: (obj) => obj._id,
            },
            title: { type: GraphQLString },
            url: { type: GraphQLString },
        }),
    });

    let linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType,
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
