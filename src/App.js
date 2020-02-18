import React from 'react'
import './stylesheets/DayOne.css'
import './stylesheets/DayTwo.css'
import './stylesheets/App.css'
import DayOne from './containers/DayOne'
import DayTwo from './containers/DayTwo'



function App() {
  return (
    <div className="App">
      <div className="block-forms">
      <DayOne/>
      <DayTwo/>

      </div>
    </div>
  );
}

export default App;
