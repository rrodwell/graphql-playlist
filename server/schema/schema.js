const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

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
        // return _.find(authors,{ id: parent.authorId });

        //Code to get data from DB / other source
        return Author.findById(parent.authorId);
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
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
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
        // return _.find(books, { id: args.id })
        
        //Code to get data from DB / other source
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent,args){
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args) {
        // return books
        return Book.find({}); // Passing in an empty object returns all bc they all match
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'What is this endpoint? This returns a list of all authors',
      resolve(parent,args) {
        // return authors
        return Author.find({});
      }
    }
  }
});

// Functions or Methods use to mutate the data in the DB. Ie. add, delete, update.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent,args) {
        let author = new Author({ //MongoDB Model
          name: args.name,
          age: args.age
        }); 
        return author.save(); //Save method comes from mongo 
      } 
    },
    addBook: {
      type: BookType,
      description: 'Add a new book to mongoDB',
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent,args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        }); 
        return book.save();
      } 
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery, //The different queries a user can use
  mutation: Mutation //The different mutations (CRUD operations) a user can perform
})