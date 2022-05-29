import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateOrderPage, OrderDetailPage, ProductsPage, OrderListPage } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CreateOrderPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />
        <Route path="/orders" element={<OrderListPage />} />
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
