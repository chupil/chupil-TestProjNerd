import React, { Component, Fragment } from "react";
import $ from 'jquery'; 

export default class SignUp extends Component {
 
constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.saveText = this.saveText.bind(this);
    this.delitedText = this.delitedText.bind(this);  
    this.editText = this.editText.bind(this);
    this.dropdownsendUser = this.dropdownsendUser.bind(this);
    this.sendTask = this.sendTask.bind(this);
    this.state = {        
        save: false,       
        newTaskId : [] ,
        userOldData : [],
        usersMails :[],
        userNewData : [],
        delitedText :false,
        editText : false,
        edit : '',
        sendTask : []
       
    }
}


dropdownsendUser(e){
 $().dropdown('show') 
}

onChangeText(e) {   
  this.setState({ newTaskId :  [{
    id: `f${(+new Date).toString(16)}`,
    mes: e.target.value,
    creator:this.state.userOldData.email,
    prevOwner: [],
    newOwner :[],    
}],
 edit: e.target.value
 });  

}


sendTask(text,account,e){ 
  text.newOwner = account.email;
  text.prevOwner = this.state.userOldData.email; 
  var accountData = JSON.parse(localStorage.getItem(account.email)); 
  if(text.mes.length != 0){  
  Array.prototype.push.apply(accountData.text, [text]); 
  localStorage.setItem(account.email, JSON.stringify(accountData));
  this.delitedText(text,e);
  
  }
  window.alert("success"+ " "+ account.account +" "+ account.email);
}


saveText(text,e) {    
  if(this.state.editText == true){    
    for( var i = 0; i <  this.state.userOldData.text.length; i++){    
      if( this.state.userOldData.text[i].id == text.id){
        this.state.userOldData.text[i].mes = this.state.edit;           
       }     
    }      
   } else if(this.state.userOldData.text.length != 0){  
  Array.prototype.push.apply(this.state.userOldData.text, this.state.newTaskId); 
  }

  localStorage.setItem(this.props.user.email, JSON.stringify(this.state.userOldData));
  this.setState({save:!this.state.save, editText : false }); 
  e.preventDefault();
}
   
delitedText(text,e) {
  var newArray =[]; 
   for( var i = 0; i <  this.state.userOldData.text.length; i++){    
       if( this.state.userOldData.text[i].id != text.id){
        newArray.push(this.state.userOldData.text[i]);
        }           
    } 
    var oldData =   this.state.userOldData;
    oldData.text = newArray;
    var  newDelData = oldData;
   localStorage.setItem(this.props.user.email, JSON.stringify(newDelData));
   this.state.userOldData = JSON.parse(localStorage.getItem(this.props.user.email));     
   this.setState({ userNewData :  this.state.userOldData, delitedText:!this.state.delitedText });  
   e.preventDefault();
}

editText(){
  this.setState({editText : !this.state.editText});

}



componentDidMount(){
    this.state.userOldData = JSON.parse(localStorage.getItem(this.props.user.email)); 
    this.state.usersMails = JSON.parse(localStorage.getItem("accounts"));     
    this.setState({ userNewData :  this.state.userOldData });
    
  }


 componentDidUpdate(prevProps, prevState) {
 }



    render() {
 
   
 
 
        return (

          <Fragment> 
 

{ this.state.userOldData.text && this.state.userOldData.text.map((text,index) => { 
  

    return (        
<div class="col-sm multi" key={index}>
<div  class="container mb-1"  >
<h1 class="btn btn-sm btn-outline-secondary">{this.state.userOldData.name}</h1></div>
<div  class="container mb-1"  >

</div>

<div class="row"  >

  <div class="col-md-4" >
    <div class="card mb-4 box-shadow">      
      <div class="card-body"  > 
        
        <form >
          <div class="row">
          {this.state.editText || text.mes.length ==0 ? 
            <div class="col">            
            <textarea class="form-control" id="textMes" aria-label="With textarea" rows="6" 
            wrap   
              onChange={(e) => {this.onChangeText(e, "textMes") }}></textarea>
            </div> 
:
            <div class="col">
            <textarea class="form-control height"  rows="6"  wrap  value={text.mes} disabled   > </textarea>
            </div>}
            
           
          </div>
        </form>
        
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group mt-1">
            <button type="button" class="btn btn-sm btn-outline-secondary"  onClick={(e)=> {this.saveText(text,e)}}>Save</button>
            <button type="button" class="btn btn-sm btn-outline-secondary"  disabled = {text.mes.length == 0} onClick={(e)=> {this.delitedText(text,e)}} >Delete </button>
            <button type="button" class="btn btn-sm btn-outline-secondary"  disabled = {text.mes.length == 0} onClick={(e)=> {this.editText(text,e)}} >Edit</button>
           
            <div class="dropdown">
          <button class=  "btn btn-secondary dropdown-toggle" disabled = {text.mes.length == 0}
          type="button" id={index} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          onClick={(e)=> {this.dropdownsendUser(e)}} >
            Send tasks
          </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" >

         
            {this.state.usersMails && this.state.usersMails.map((account,index)=>{
              return (   
              <a class="dropdown-item " href="#" key={index} onClick={(e)=> {this.sendTask(text,account,e)}} >{account.account}    {account.email}</a>
              )})};           
              

              
             </div>
</div>
          </div>          
    
        </div>
        {text.prevOwner && (text.prevOwner.length>0) && <h1 class="btn btn-sm btn-warning">Get from:{text.prevOwner}</h1>}
               
      </div>
    </div>

  </div>

</div>


</div>)})}
</Fragment>


        );
    }
}

