import logo from './logo.svg';
import './App.css';
import LandNavbar from './components/landNav/landNav';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './pages/landing_page/landing_page';
import AllPages from './routes/routes';
import { AuthProvider } from './hooks/useAuth/userAuth';
import { AllCatgrisProvider } from './hooks/item_categories/item_catgris';
import { UserDataProvider } from './contexts/multipleData/dataContext';
import { MycartDataProvider } from './hooks/my_cart/my_cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AllCatgrisProvider2 } from './hooks/item_categories/itemcatgris2';
import { AllShopsProvider } from './hooks/all_shops/all_shops';
import { SearchProvider } from './contexts/searchProductsContext/searchPros';


const pk_key = "pk_test_51PfO6vRtjACyAhQqmbsk1NdCGwD1xGTVxAiQkWmpLrgQ6ifjygOiGCzrhBE3H8U68beHRusG0rXU6tKcjX7o1uYL001odmBYYM"
const stripePromise = loadStripe(pk_key)

function App() {
  return (
    <>
      {/* <h1>Shiva</h1> */}
      <BrowserRouter>
        <AuthProvider>
          <AllCatgrisProvider>
            <UserDataProvider>
              <MycartDataProvider>
                <AllCatgrisProvider2>
                  <AllShopsProvider>
                    <SearchProvider>
                    <Elements stripe={stripePromise}>
                      <AllPages />
                    </Elements>
                    </SearchProvider>
                  </AllShopsProvider>
                </AllCatgrisProvider2>
              </MycartDataProvider>
            </UserDataProvider>
          </AllCatgrisProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
