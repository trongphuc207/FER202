import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import AccountsGallery from './components/AccountsGallery';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div >
      <CounterComponent />
      <LightSwitch/>
      <LoginForm/>
      <LoginForm2/>
      <SearchItem/>
      <AccountsGallery/>
      <RegisterForm/>
    </div>
  );
}

export default App;
