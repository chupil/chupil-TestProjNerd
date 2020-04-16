import React, { Component } from "react";
import { Link } from "react-router-dom"


export default class SignUp extends Component {

    userData;

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            save: null
        }
    }

    // Form Values
    onChangeName(e) {
        this.setState({ name: e.target.value });
       
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
        
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
       
    }


    
    componentDidMount() {
       
        this.userData = JSON.parse(localStorage.getItem(this.state.email));

        if (localStorage.getItem(this.state.email)) {
            this.setState({
                name: this.userData.name,
                email: this.userData.email,
                password: this.userData.password
            })
        } else {           
            this.setState({
                name: '',
                email: '',
                password: ''
            })
          

        }
    }

  

    onSubmit(e) {       
        e.preventDefault()
        this.setState({save:true});

       

        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            text : [{
                id: '',
                mes: ''
            }] 
        };
        var accounts = [{  
                account: this.state.name,
                email: this.state.email
            }]; 
            
                
        localStorage.setItem(user.email, JSON.stringify(user));

        // it accounts array builder

        var accountsData = JSON.parse(localStorage.getItem("accounts"));
        if(accountsData != null){
            if(accountsData){                  
                accountsData.map((account,index)=>{
                if(account.email == this.state.email){ 
                    accountsData.splice(index,1);
                }
            });
            Array.prototype.push.apply(accountsData, accounts)
            localStorage.setItem("accounts", JSON.stringify(accountsData));
        }
        }
            else{           
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }
        
    }
 
    render() {
        
        return (

            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" 
                    value={this.state.name}  required onChange={this.onChangeName} />
                </div>           

                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" placeholder="Enter email" 
                        value={this.state.email} onChange={this.onChangeEmail}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                    defaultvalue={this.state.password} onChange={this.onChangePassword} />
                </div>

               
                
                    <button type="submit" className="btn btn-primary btn-block">
        Sign Up </button>  
        {this.state.save &&  <Link  to={"/sign-in"}>
                   <button type="submit" className="btn btn-success btn-block mt-2">
        return to Sign in </button>  </Link>}              
            </form>


        );
    }
}

