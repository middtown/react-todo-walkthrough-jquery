// src/components/CreateTodoForm.js
import React, {Component} from 'react';

class CreateTodoForm extends Component {
  	constructor() {
  		super();

  		this.state = {
  			todo: ''
  		};
  	}

  	onInputChange(event){
  		console.log('create todo input changed');
  	}

  	onFormSubmit(event){
  		console.log('form submitted');
  		event.preventDefualt();
  		let newTodo = this.state.todo;
  		this.props.createTodo(newtodo);
  		this.setState({
  			todo:''
  		});
  	}

  render(){
    return (
      <div className='createForm todoForm'>
        <h2>Create Todo Here!</h2>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
          	onChange={event => this.onInputChange(event)}
            placeholder='Write a todo here ...'
            type='text'
            value={this.state.todo} />
          <button type='submit'>Create Todo!</button>
        </form>
      </div>
    )
  }
}

export default CreateTodoForm
