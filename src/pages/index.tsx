import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import List from '../List'; 



const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <List />
  </ApolloProvider>
);

export default App;


