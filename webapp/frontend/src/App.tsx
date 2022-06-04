import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateOrderPage, OrderDetailPage, ProductsPage, OrderListPage } from './pages';
import { AppRuntimeProvider } from './contexts/app-runtime';
import { CartProvider } from './contexts/cart';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppRuntimeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CreateOrderPage />} />
              <Route path="/order/:id" element={<OrderDetailPage />} />
              <Route path="/orders" element={<OrderListPage />} />
              <Route path="*" element={<p>There's nothing here!</p>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AppRuntimeProvider>
    </ChakraProvider>
  );
};

export default App;
