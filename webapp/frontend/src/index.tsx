import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './contexts/cart';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

const client = new ApolloClient({
  uri: 'http://localhost:3200/graphql',
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <CartProvider>
      <App />
    </CartProvider>
  </ApolloProvider>
);
