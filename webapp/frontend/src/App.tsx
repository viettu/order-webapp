import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Layout } from "./components"
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Cart, Order, OrderDetail, ProductSelection } from "./pages";


// const 

const AppContainer = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Outlet></Outlet>
      {/* <Home></Home> */}
    </Layout>
  </ChakraProvider>
);

// const App = () => (
//   <ChakraProvider theme={theme}>
//     <Layout>
//       <Home></Home>
//     </Layout>
//   </ChakraProvider>
// )

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route path="product-selection" element={<ProductSelection />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />}>
            {/* <Route path=":id" element={<OrderDetail />} /> */}
          </Route>
          <Route path="order/:id" element={<OrderDetail />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
