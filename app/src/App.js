import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'
import ListTask from './components/task/ListTasks'
import NewTask from './components/task/NewTask'
import UpdateTask from './components/task/UpdateTask'

function App() {
  return (
    <Router>
      <Fragment>
        <Header></Header>
        <div className="grid contenedor contenido-principal">
          <NavBar/>
          <main className="caja-contenido col-9">
              <Switch>
                  <Route exact path="/" component={ListTask}></Route>
                  <Route exact path="/task" component={ListTask}></Route>
                  <Route exact path="/task/new" component={NewTask}></Route>
                  <Route exact path="/task/edit/:id" component={UpdateTask}></Route>
                  <Route exact path="/users" component={ListTask}></Route>
              </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
