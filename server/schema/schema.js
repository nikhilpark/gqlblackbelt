const graphql = require('graphql');
const  _ = require('lodash');

const {GraphQLObjectType,GraphQLString,
    GraphQLID,GraphQLSchema,GraphQLInt} = graphql;

var books = [
    {name:"book1",genre:"genre1",id:1,authorID:1},
    {name:"book2",genre:"genre2",id:2,authorID:2},
    {name:"book3",genre:"genre3",id:3,authorID:3},
];

var authors = [
    {name:"author1",age:51,id:1},
    {name:"author2",age:25,id:2},
    {name:"author3",age:33,id:3},
];

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                return authors.filter(el=>el.id==parent.authorID)[0]
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
    })
}) 


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            //If a user wants to query a particular book
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return books.filter(el=>el.id==args.id)[0]
                
            }   
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return authors.filter(el=>el.id==args.id)[0]
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
})