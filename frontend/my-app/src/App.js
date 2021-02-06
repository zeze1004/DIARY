import NewDiary from './pages/NewDiary';
import Home from './pages/Home';
import Detail from './pages/Detail';

import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
    <Switch>
      <Route path="/newDiary" component={NewDiary}/>
      <Route path="/detail" component={Detail}/>
      <Route exact path="/" component={Home}/>
    </Switch>
    </>
  );
}

export default App;
