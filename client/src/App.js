import React, { Component } from 'react';
import { BrowserRouter , Route} from "react-router-dom";
import logo from './logo.svg';
import Search from './search.js';
import Choose from './choosePokemon.js';
import './App.css';
import './App.scss';

class App extends Component {
 render() {
   return (
     <BrowserRouter>
       <div className="App">
         <Route exact path="/" component={Search} />
         <Route exact path="/info/:id" component={Choose} />
       </div>

     </BrowserRouter>

   );
 }
}

export default App;
