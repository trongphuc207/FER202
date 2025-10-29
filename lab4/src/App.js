
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div>     
      <LoginForm/>    
      <SignUpForm/>
      <QuestionBank/>
    </div>
  );
}

export default App;
