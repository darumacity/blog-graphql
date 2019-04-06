const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const entryResolvers = require('./modules/entry/resolvers').resolvers;

const typeDefs = importSchema('schema.graphql');
const resolvers = {
    Query: {
        entries: async (parent, args, context) => {

            var query = 'select EntryId as id, Title as title, Content as content, Description as description, Image as image, WroteDate as wroteDate from entries';

            if (args.id) {
                query += ' where EntryId = ?';
            }
            
            const [rows] = await context.promisePool.query(query, [args.id]);
            return rows;
        },
    },
    ...entryResolvers,
};

module.exports = { schema: makeExecutableSchema({ typeDefs, resolvers }) };
