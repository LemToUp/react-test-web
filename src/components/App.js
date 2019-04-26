import React, { Component } from 'react';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.scss';
import WidgetPanel from './WidgetPanel'

class App extends Component {
  render() {
    let panelsRender = [];
    const panelsCount = 10;
    for(let i = 0; i < panelsCount; i++) {
      panelsRender.push(<WidgetPanel key={i} number={i}/>);
    }
    return (
      <div className="App">
        <header className="App-header row justify-content-center">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body row">
            <div className="col-md-8 offset-md-2">
                    <div className="row">
                        {panelsRender}
                    </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
