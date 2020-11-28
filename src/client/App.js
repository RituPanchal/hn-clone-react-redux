import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewsComponent from './components/NewsComponent';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={NewsComponent} />
      </Switch>
    );
  }
}

export default App;