import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './Layout.jsx'
import Home from './Components/Dashboard/Home.jsx'
import Register from './Components/pages/Register.jsx'
import Login from './Components/pages/Login.jsx'
import ProtectedRoute from './util/ProtectedRoute.jsx'
import ForgotPassword from './Components/pages/ForgotPassword.jsx'
import ResetPassword from './Components/pages/ResetPassword.jsx'
import About from './Components/About/About.jsx'
import Category from './Components/Category/Category.jsx'
import Cart from './Components/Cart/Cart.jsx'
import { UserContextProvider } from './Context/AuthContext';
import { ProductContextProvider } from './Context/ProductContext.jsx'
import ProductPage from './Components/pages/ProductPage.jsx'
import { CartContextProvider } from './Context/CartContext.jsx'
import { AddressContextProvider } from './Context/AddressContext.jsx'
import Order from './Components/Dashboard/Order.jsx'
import OrderPage from './Components/pages/OrderPage.jsx'
import Wishlist from './Components/Dashboard/Wishlist.jsx'
import AdminDashBoard from './Components/Admin/AdminDashBoard.jsx'
import AdminProtectedRoute from './util/AdminProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <AddressContextProvider>
        <UserContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <Layout />
            </CartContextProvider>
          </ProductContextProvider>
        </UserContextProvider>
      </AddressContextProvider>,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'signup',
        element: <Register />
      },
      {
        path: 'signin',
        element: <Login />
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: 'reset/:id',
        element: <ResetPassword />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'cart',
        element: <ProtectedRoute>
          <Cart value='user' />
        </ProtectedRoute>
      },
      {
        path: 'orders',
        element: <ProtectedRoute>
          <Order value='user' />
        </ProtectedRoute>
      },
      {
        path: 'orders/:id',
        element: <ProtectedRoute>
          <OrderPage value='user' />
        </ProtectedRoute>
      },
      {
        path: 'product/:id',
        element: <ProductPage />
      },
      {
        path: "wishlist",
        element: <ProtectedRoute>
          <Wishlist value='user' />
        </ProtectedRoute>
      }

    ]
  },
  {
    path: '/admin/dashboard',
    element:<AdminProtectedRoute> 
    <AdminDashBoard value='admin' />
    </AdminProtectedRoute>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
