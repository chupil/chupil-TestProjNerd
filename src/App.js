import React from 'react';
import 'bootstrap' 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import {createBrowserHistory} from 'history'
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Task from "./components/task.component";
import TaskTable from "./components/TaskTable";



const history = createBrowserHistory();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.returnTo = this.returnTo.bind(this);
    this.taskTable = this.taskTable.bind(this);
    this.state = { user : [], taskLogin : true };}


  returnTo(){
    this.setState({taskLogin : true }); 
    }

  userLogin(userlogined){
    this.setState({ user : userlogined, taskLogin : false});  
  }

  taskTable(){
    this.forceUpdate();
  }


  render() {   
    

  return ( <Router >
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"} onClick= {(e)=>{ this.returnTo(e); }}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"} onClick= {(e)=>{ this.returnTo(e); }}>Sign up</Link>
              </li>  
              {!this.state.taskLogin && <li className="nav-item">
                <Link className="nav-link" to={"/task"}  onClick= {(e)=>{ this.taskTable(e); }}>MyTask</Link>
              </li>}
            {!this.state.taskLogin && <li className="nav-item">
                <Link className="nav-link" to={"/task-table"}  onClick= {(e)=>{ this.taskTable(e); }}>TaskTable</Link>
              </li>}
              
             
              
                      
            </ul>
          </div>
        </div>
      </nav>
      
      <div className= {this.state.taskLogin ? "auth-wrapper":"auth-wrapper-task pt-5 "}>
        <div className={this.state.taskLogin ? "auth-inner" : "auth-inner-task-multi row row-cols-4"} >
        <Switch>
            <Route exact path='/'   render={props => <Login userLogin = {this.userLogin}/>} />
            <Route history={history}  path="/sign-in" render={props => <Login userLogin = {this.userLogin}/> }/>
            <Route history={history}  path="/sign-up" render ={()=><SignUp />} />            
            <Route history={history}  path="/task" render ={()=><Task user = {this.state.user}/>} />
            <Route history={history}  path="/task-table" render ={()=><TaskTable user = {this.state.user}/>} />
            </Switch>
        </div>
      </div>     

      
   
    </div>

    
    
    </Router>
  );
}
}

export default withRouter(App);

