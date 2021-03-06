/**
  AddItem page allows user with role "admin" to add an item to storage,
  it will not be shown to user with not "admin" role
  route: /add 
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory } from 'react-router';

class AddItem extends Component {
  render() {
    //Check role, if role is not "admin" redirect to prohibited page
    let role = this.props.store.role;
    if(role !== "admin"){
     browserHistory.push('/prohibited');
    }
    
    // If role is "admin" continue to render the component
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>
          Add another item here 
        </h1>
        <div>
          <form onSubmit={this.submit.bind(this)} >
            <div style={{position:"relative"}}>
              <input
                type="text"
                id="name"
                placeholder="item name"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                ref={(input) => {this.nameInput = input}}/>
              <label >
                  Name
              </label>
            </div >
            <div style={{position:"relative",right:3}}>
              <input
                type="text"
                id="price"
                placeholder="price"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                ref={(input) => {this.priceInput = input}}/>
              <label htmlFor="price">
                Price
              </label>
            </div >
            <div style={{position:"relative",left:18}}>
              <input
                type="text"
                id="description"
                placeholder="description"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                ref={(input) => {this.descriptionInput = input}}/>
              <label htmlFor="description">
                Description
              </label>
            </div >
            <div style={{marginTop:2, marginRight:147}}>
              <button className="sbmt-btn">
                Submit
              </button>
            </div>
          </form >
        </div>
      </div>
    )
  }
  submit(evt) {
    // Avoid page reload
    evt.preventDefault();
    
    // Use ref to work with content of input tags
    let name=this.nameInput.value;
    let price=Number(this.priceInput.value);
    let description=this.descriptionInput.value;
    
    // I want fields name and price be fullfilled, and also price must be correct
    if((name.length>0) && !isNaN(price) && (price>0)){
      let newId = Number(localStorage.max)+1;
      let item = {
        "id": newId,
        "name":name,
        "img":"../items/img/item.jpg",
        "price":price,
        "description":description
      }
      
      // Clear the fields of inputs after submitting
      this.nameInput.value='';
      this.priceInput.value='';
      this.descriptionInput.value='';
      
      // Dispatch new action to change the store
      this.props.onAddItem(item);
    }
  }
}
export default connect(
  state => ({
    store:state
  }),
  dispatch => ({
    onAddItem:(item) =>{
     dispatch({type:'ADD_ITEM',payload:item});
    }
  })
)(AddItem);