import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} from 'graphql';

const Schema = (db) => {
    let data = [
      { counter: 42 },
      { counter: 43 },
      { counter: 44 },
    ];

    const linkType = new GraphQLObjectType({
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
                links: {
                    type: new GraphQLList(linkType), // type of the field you are asking for
                    resolve: () => db.collection('links').find({}).toArray(), // this fnc will exc when a query asks for the field
                },
                message: {
                    type: GraphQLString,
                    resolve: () => 'Hello GraphQL',
                },
            }),
        }),


    });

    return schema;
};

export default Schema;
