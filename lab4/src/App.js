import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div>
      <QuestionBank/>
      <hr className="my-5"/>
      <LoginForm/>
      <hr className="my-5"/>
      <SignUpForm/>
    </div>
  );
}

export default App;
