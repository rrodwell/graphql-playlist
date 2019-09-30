const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

let books = [
  { id: '1', name: 'Test1', genre: 'Fantasy', authorId: '3'},
  { id: '2', name: 'Test2', genre: 'Action', authorId: '2'},
  { id: '3', name: 'Test3', genre: 'Fiction', authorId: '1'},
  { id: '4', name: 'Test4', genre: 'Action', authorId: '2'},
  { id: '5', name: 'Test5', genre: 'Action', authorId: '2'},
  { id: '6', name: 'Test6', genre: 'Fiction', authorId: '3'},
]

let authors = [
  { id: '1', name: 'Patrick', age: 44},
  { id: '2', name: 'Ryan', age: 35},
  { id: '3', name: 'Jacob', age: 21},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'BookType description',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent,args) {
        return _.find(authors,{ id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'This is a description for RootQuery',
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'What is this endpoint? This returns a list of all authors',
      resolve(parent,args) {
        return authors
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})