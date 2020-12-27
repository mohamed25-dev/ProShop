import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RgisterScreen from './screens/RgisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RgisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/product/create" component={ProductCreateScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/admin/products" component={ProductListScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/admin/users" component={UserListScreen} />
          <Route path="/admin/user/:id" component={UserEditScreen} />
          <Route path="/admin/orders" component={OrderListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
