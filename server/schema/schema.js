const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

let books = [
  { id: '1', name: 'Test1', genre: 'Fantasy'},
  { id: '2', name: 'Test2', genre: 'Action'},
  { id: '3', name: 'Test3', genre: 'Fiction'},
]

let authors = [
  { id: '1', name: 'Patrick', age: 44},
  { id: '2', name: 'Ryan', age: 35},
  { id: '3', name: 'Jacob', age: 21},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent,args){
        //Code to get data from DB / other source
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent,args){
        //Code to get data from DB / other source
        return _.find(authors, { id: args.id })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})