import React from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux'
import NewsComponent from './components/NewsComponent';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path="/" exact={true} component={NewsComponent} />
        </Switch>
      </Provider>
    );
  }
}

export default App;