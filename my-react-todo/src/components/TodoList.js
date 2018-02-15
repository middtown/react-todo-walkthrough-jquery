import React, {Component} from 'react';
import Todo from './Todo';

class TodoList extends Component {
	
	render(){
		let todoArray = this.props.todos.map((todo) => {
			return (
				<Todo
					key={todo._id}
					todo={todo} />
				)
		});
		return (
			<div classNme="todos">
				{todoArray}
			</div>
		)
	}
}

export default TodoList;