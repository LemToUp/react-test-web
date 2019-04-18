import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import WidgetPanel from './WidgetPanel'

class App extends Component {
  render() {
    let panelsRender = [];
    const panelsCount = 10;
    for(let i = 0; i < panelsCount; i++) {
      panelsRender.push(<WidgetPanel key={i}/>);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
          {panelsRender}
        </div>
      </div>
    );
  }
}

export default App;
