import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { PaymentProvider } from './contexts/PaymentContext.jsx';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer.jsx';

function App() {
  return (
  
    <AuthProvider>

      <PaymentProvider>
        <div className="App">

          <AppRoutes />
          <Footer/>
        </div>
      </PaymentProvider>
    </AuthProvider>

  );
}

export default App;
