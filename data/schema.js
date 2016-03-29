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
    mutationWithClientMutationId,
    globalIdField,
} from 'graphql-relay';
const Schema = (db) => {
    let store = {};


    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
          id: globalIdField('Store'),
          linkConnection: {
              type: linkConnection.connectionType,
              args: connectionArgs, // first, last .... etc
              resolve: (_, args) => connectionFromPromisedArray(
                db.collection('links').find({})
                .sort({createdAt: -1})
                .limit(args.first)
                .toArray(), // this fnc will exc when a query asks for the field
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
            createdAt: {
              type: GraphQLString,
              resolve: (obj) => new Date(obj.createdAt).toISOString()
            }
        }),
    });

    let linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType,
    });

    let createLinkMutation = mutationWithClientMutationId({
        name: 'CreateLink',
        inputFields: {
          title: { type: new GraphQLNonNull(GraphQLString) },
          url: { type: new GraphQLNonNull(GraphQLString) },
        },
        outputFields: {
          linkEdge: {
            type: linkConnection.edgeType,
            resolve: (obj) => ({
              node: obj.ops[0],
              cursor: obj.insertedId
            })
          },
          store: {
            type: storeType,
            resolve: () => store
          }
        },
        mutateAndGetPayload: ({title, url}) => {
          return db.collection('links').insertOne({
            title,
            url,
            createdAt: Date.now()
          });
        }
    })

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

        mutation: new GraphQLObjectType({
          name: 'Mutation',
          fields: () => ({
              createLink: createLinkMutation
          })
        })
    });

    return schema;
};

export default Schema;
