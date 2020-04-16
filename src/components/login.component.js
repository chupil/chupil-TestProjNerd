import React, { Component } from "react";
import { Redirect } from 'react-router'; 



export default class Login extends Component {
    userData;

    constructor(props) {
        super(props);

       
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state =
         {  email: '',
            password: '',           
            welcome: false,
            check: false,
            wrong: false
        }
    }


    

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }


   

    onSubmit(e) {
       
        this.setState({check : !this.state.check});

        this.userData = JSON.parse(localStorage.getItem(this.state.email,this.state.email));
                 
        if(!(this.userData == null)  && this.state.email ==  this.userData.email && this.userData.password === this.state.password){
            this.setState({welcome : true});          
            this.props.userLogin(this.userData); 
        }
        
        }


 
        // componentDidUpdate(prevProps, prevState) {
  
        //     if(this.state.check !== prevState.welcome && this.state.email.length != 0 &&  this.state.email.length != 0 ){
                
        //         this.userData = JSON.parse(localStorage.getItem(this.state.email,this.state.email));
                 
        //         if(!(this.userData == null)  && this.state.email ==  this.userData.email && this.userData.password === this.state.password){
        //             this.setState({welcome : true});          
        //             this.props.userLogin(this.userData); 
        //         }
                   
                

        //     }

           
        // }        




    render() {
        if (this.state.welcome) {
            return <Redirect  push  to= {{ pathname: "/task"}}/>
          }

         
        return (
            <form onSubmit={this.onSubmit}>
                <h3> Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                     value={this.state.email} onChange={this.onChangeEmail} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                    defaultvalue={this.state.password} onChange={this.onChangePassword} />
                </div>
               

                <button   type="submit" className="btn btn-primary btn-block">Submit</button> 

                
            </form>
        );
    }
}



