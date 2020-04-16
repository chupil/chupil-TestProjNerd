import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";


export default class TaskTable extends Component {

    

    constructor(props) {
        super(props);   

        this.state = {
            accounts : [],
            accountsAndTasksAndID :[]
        }
    }



    componentDidMount(){         
        this.state.accounts = JSON.parse(localStorage.getItem("accounts"));  
           
                
        this.state.accounts && this.state.accounts.map((account,index) => {
                    let user = JSON.parse(localStorage.getItem(account.email));
                    if(user && account.email == user.email ){
                        Array.prototype.push.apply(this.state.accountsAndTasksAndID, [{user}]);
                    }
                                      
                    
                })
               
                localStorage.setItem("usersData", JSON.stringify(this.state.accountsAndTasksAndID));
                this.forceUpdate();
    }

 
    render() {
        

       
        

       
        return (


            this.state.accountsAndTasksAndID && this.state.accountsAndTasksAndID.map((account,index) => {                 
                  var idAndMas = account.user.text.map((account,index)=>{   
                   
                    return   <Fragment >
                    <div class=" TaskBorderBot" key={index}>
                        <div class="row ">
                            <div class="row justify-content-center m-1">
                            {account.creator && (account.creator.length>0) && <p><b>Creat: </b>{account.creator} </p> }
                            {account.prevOwner && (account.prevOwner.length>0) && <p><b>Get from: </b> {account.prevOwner}</p>}
                            </div>
                            
                        </div>
                        <div class="row ">
                        {account.mes && (account.mes.length>0) && <div class="row justify-content-center mt-1"><p class="fix-it"><b>TASK: </b>{account.mes}</p></div>}
                        </div>

                        </div>
                     </Fragment>
           
                   

                })

                var Tasks = account.user.text.map((task)=>{ 

                    return <Fragment> <div class="row">                        
                   {task.mes && (task.mes.length>0) && <li ><p><b>TASK: </b>{task.mes}</p> </li>}
                    </div>
                    </Fragment>

                })

                return (  
           

                    <div class="container text-center TaskBord" key={index}>
                        <div class="row">
                            <div class="col-md-4 TaskBorderBotRight">
                                <div class="col ">
                                    <ol >
                                    
                                        {Tasks}
                                    </ol>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col">
                                        <div class="row justify-content-center">
                                            <div class="row ">  <p><b>ToDo: </b>{account.user.name} &#8195;</p>
                                                <p><b>Mail: </b>{account.user.email}</p></div>
                                         </div>
                                        <div class="col ">
                                            {idAndMas}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

       
        
        )})
        );
    }
}

