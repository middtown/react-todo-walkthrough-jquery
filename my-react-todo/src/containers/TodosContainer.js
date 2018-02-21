// src/containers/TodosContainer.js
import React, {Component} from 'react';
import TodoModel from '../models/todo';
import TodoList from '../components/TodoList';
import CreateTodoForm from '../components/CreateTodoForm';

class TodosContainer extends Component {
  constructor(){
    super();
    this.state = {
      todos: []
    };
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    TodoModel.all().then((res) => {
      console.log('to do', res.todos);
      this.setState ({
        todos: res.todos
      });
    });
  }

  createTodo(newBody) {
    let newTodo = {
      body: newBody,
      completed: false
    }
    TodoModel.create(newTodo).then((res) => {
      console.log('created todo', res);
      let todo = this.state.todo;
      let newTodos = todo.push(res);
      this.setState({newTodos});
    });
  }
  createTodo(newBody) {
  console.log('creating todo', newBody)
}
render(){
  return (
    <div className="todosContainer">
      <CreateTodoForm
        createTodo={this.createTodo.bind(this)} />
      <TodoList
        todos={this.state.todos} />
    </div>
  )
}
}

export default TodosContainer;
