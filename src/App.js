import logo from './logo.svg';
import './App.css';

import Quora from './quora/Routing';
import AddToHomeScreen  from './AddToHomeScreen';

function App() {
  return (
    <div className="App">

      <Quora/>
      <AddToHomeScreen/>
  
    </div>
  );
}

export default App;
