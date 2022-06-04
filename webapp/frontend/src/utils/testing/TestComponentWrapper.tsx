import React, { ReactNode } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { MockedProvider } from '@apollo/client/testing';
import { AppRuntimeProvider, CartProvider } from '../../contexts';
import { BrowserRouter } from 'react-router-dom';

export const TestComponentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <MockedProvider>
    <ChakraProvider theme={theme}>
      <AppRuntimeProvider>
        <CartProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </CartProvider>
      </AppRuntimeProvider>
    </ChakraProvider>
  </MockedProvider>
);
