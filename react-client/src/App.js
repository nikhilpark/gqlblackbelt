
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import BookList from './components/BookList'
import './App.css'

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
     <h1>Book List</h1>
     <br/>
     <BookList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
