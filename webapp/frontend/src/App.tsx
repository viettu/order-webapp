import { ChakraProvider, theme } from '@chakra-ui/react';
import { Layout } from './components';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { CreateOrder, OrderDetail, ProductSelection, OrderList } from './pages';
import { AppRuntimeProvider } from './contexts/app-runtime';

const AppContainer = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppRuntimeProvider>
        <Layout>
          <Outlet></Outlet>
        </Layout>
      </AppRuntimeProvider>
    </ChakraProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route path="products" element={<ProductSelection />} />
          <Route path="cart" element={<CreateOrder />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
