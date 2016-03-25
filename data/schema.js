import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
} from 'graphql';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            counter: {
                type: GraphQLInt, // type of the field you are asking for
                resolve: () => 42, // this fnc will exc when a query asks for the field
            },
        }),
    }),
});

export default schema;
