import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Layout from './Layout.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';

import PaymentPage from './pages/PaymentPage'; 

const stripePromise = loadStripe('your-publishable-key-here'); 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:id',
        element: <Profile />
      }, {
        path: '/payment/:id',
        element: <PaymentPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
  <RouterProvider router={router} />
</Elements>
)
