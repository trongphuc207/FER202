
import { ThemeProvider } from "./contexts/ThemeContext";
import LightSwitch from "./components/LightSwitch";
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from "./components/CounterComponent";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
  <ThemeProvider>
      <CounterComponent />
      <LightSwitch />
      </ThemeProvider>

    <AuthProvider>
    <div className="App">
      <LoginForm />
    </div>
    </AuthProvider>
    </div>
  
  );
}

export default App;
