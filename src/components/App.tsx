import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.scss';
import WidgetPanel from './WidgetPanel';

const logo = require("../logo.svg");

class App extends Component {
    render() {
        const panelsCount = 10;
        let panelsRender = Array(panelsCount).fill(null).map((value, index) => {
            return <WidgetPanel key={`widget_${index}`} number={index}/>;
        });
        return (
            <div className="App container-fluid">
                <header className="App-header row justify-content-center">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div className="App-body row">
                    <div className="col-md-8 offset-md-2">
                        <div className="row m-1">
                            {panelsRender}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
