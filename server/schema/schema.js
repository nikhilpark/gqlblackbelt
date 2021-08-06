const graphql = require('graphql');
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');


const {GraphQLObjectType,GraphQLString,
    GraphQLID,GraphQLSchema,GraphQLInt,GrpahQLList} = graphql;



const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            async resolve(parent,args){
                return Author.findOne({_id:parent.authorID})
            }
        }
    }) 
}) 

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString}, 
        age:{type:GraphQLInt},
        books:{
            type:graphql.GraphQLList(BookType),
            async resolve(parent,args){
                return Book.find({authorID:parent.id})

            }
        }
    })
}) 


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            //If a user wants to query a particular book
            args:{id:{type:GraphQLID}},
            async resolve(parent,args){
                return await Book.findOne({_id:args.id})
               
                 
            }   
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            async resolve(parent,args){
                return await Author.findOne({_id:args.id})            }
        },
        books:{
            type:new graphql.GraphQLList(BookType),
            async resolve(parent,args){
                return await Book.find({})
            }
        },
        authors:{
            type:new graphql.GraphQLList(AuthorType),
            async resolve(parent,args){
                return await Author.find({})
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorID:{type:GraphQLID},
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorID:args.authorID,
                })
                return book.save();
            }
        }
        
    }
})

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})