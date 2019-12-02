import React, {Fragment, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'
import ListTask from './components/task/ListTasks'
import NewTask from './components/task/NewTask'
import UpdateTask from './components/task/UpdateTask'
import Assign from './components/task/Assign'
import ListUser from './components/user/ListUser'
import NewUser from './components/user/NewUser'
import UpdateUser from './components/user/UpdateUser'
import FirstUser from './components/user/FirstUser'
import { CRMContext, CRMProvider } from './context/CRMContext'
import Login from './components/auth/Login'

function App() {

  const [auth, saveAuth] = useContext(CRMContext)

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, saveAuth]}>
          <Header></Header>
          <div className="grid contenedor contenido-principal">
            <NavBar/>
            <main className="caja-contenido col-9">
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/task" component={ListTask}></Route>
                    <Route exact path="/task/new" component={NewTask}></Route>
                    <Route exact path="/task/edit/:id" component={UpdateTask}></Route>
                    <Route exact path="/task/assign/:id" component={Assign}></Route>
                    <Route exact path="/user" component={ListUser}></Route>
                    <Route exact path="/user/new" component={NewUser}></Route>
                    <Route exact path="/user/edit/:id" component={UpdateUser}></Route>
                    <Route exact path="/first" component={FirstUser}></Route>
                </Switch>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
