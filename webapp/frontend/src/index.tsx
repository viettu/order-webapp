import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const GRAPHQL_URL = 'http://localhost:3200/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
