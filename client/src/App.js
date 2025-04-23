import './App.css';
import {Route} from "react-router-dom"
import Landing from "./components/Landing/Landing"
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/detail/:id" component={Detail}/>
      <Route exact path="/create" component={Form}/>
    </div>
  );
}

export default App;
