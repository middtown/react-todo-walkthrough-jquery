## Sprint 3: Fetching Data with Axios

React actually isn't as full-featured as some front-end frameworks like AngularJS or BackboneJS.  

React relies on third party libraries to fetch data.

Today, we'll be using a library called [Axios](https://github.com/mzabriskie/axios), a promise-based HTTP client for the browser and node.


### Set Up Model File Structure

1. Install `axios` and create a `src/models` directory, which will manage AJAX requests for data. Also, make a `Todo.js` model file:

```bash
$ npm install --save axios
$ mkdir src/models
$ touch src/models/Todo.js
```

2. The super-crud API endpoints for `todos` will provide this app's data. Take a look at the raw json at https://super-crud.herokuapp.com/todos.


3. In `src/models/Todo.js`, add the following code:

```js
// src/models/Todo.js
import axios from 'axios'

class TodoModel {
  static all(){
    let request = axios.get("https://super-crud.herokuapp.com/todos")
    return request
  }
}

export default TodoModel
```


4. Think critically about the steps in this sprint so far. Are you creating a new database model? Or is this a client-side "model" as in "MVC" or "MVVM"?

5. Think critically about the `TodoModel` class.  What is a "static" method in a JavaScript class?

  > In the `TodoModel` class, `all()` is a static method. What does this mean? A static method can be called without an **instance** of the class. This will allow us to call `all()` in the following way (without ***instantiating*** the class with new): `let todos = TodoModel.all()`. [More on Static Methods in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Static_methods)


6. Think critically about the `TodoModel.all` static method.  What is `axios`? What do you think it is doing in the last code snippet?

  > Axios is a tool for making AJAX requests, and its API is pretty intuitive! When we use the `all` method on our `TodoModel`, it will make a `GET` request to the super-crud url for all todos. We tell `all` to return the request so that we can chain promises from it. (The promises will tell our code what happens next.)

### Use `TodoModel` AJAX Call in `TodosContainer` Component

1. This file isn't connected to anything yet. It must be `import`ed into the application in order to test it. Since the `TodosContainer` component will manage most of the app's logic for todos, the most logical place to import this code will be in there.

For now, make a call to `TodoModel.all` inside the `TodosContainer` `render()` method for testing purposes.

In `components/TodosContainer.js`:

```js
// src/components/TodosContainer.js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'

class TodosContainer extends Component {
  render(){
    TodoModel.all().then( (res) => {
      console.log(res);
    })
    return (
      <div className='todosContainer'>
        <h2>This is the todos container</h2>
      </div>
    )
  }
}

export default TodosContainer
```

2. Check the browser console for the response from the super-crud database. There shold be an object logged in the console. 


Now that the data is on the front end, the next series of steps focuses on how it will be presented in the view. 


### Rendering A Todo

1. To follow FIRST, it makes sense for each todo to be rendered as its own component. Create `src/components/Todo.js` and add the following code inside it:

```js
// src/components/Todo.js
import React, {Component} from 'react'

class Todo extends Component {
  render(){
    return(
      <p data-todos-index={this.props.todo._id}>
        <span>{this.props.todo.body}</span>
      </p>
    )
  }
}

export default Todo
```

2. Think critically about the code above. How do you think the `todo` prop is related to the data that came from super-crud?  What is another field that could be displayed by the `Todo` component (other than `body` and `_id`)?

<details><summary>click for an idea</summary>From the component, it's clear that <code>this.props.todo</code> is an object with keys <code>body</code> and <code>_id</code>.  It matches the super-crud data! Other fields the super-crud todos have that could be displayed include <code>priority</code> and <code>completed</code>.
</details>

3. Think critically about the code above. How will the component receive the `todo` in `props`? 

4. As a test, add a `Todo` component as part of what the `TodosContainer` component renders.  Remember to `import` `Todo`, and use any data you'd like for the body of the todo. 

```js
// src/containers/TodosContainer.js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import Todo from '../components/Todo'

class TodosContainer extends Component {
  render(){
    // check that TodoModel AJAX call gets todo data
    TodoModel.all().then( (res) => {
      console.log(res);
    })
    return (
      <div className='todosContainer'>
        <h2>This is the todos container</h2>
        <Todo
          key={"58e3c74c93075e0011489f04"}
          todo={{"_id":"58e3c74c93075e0011489f04","body":"Take a walk outside","priority":5,"completed":false,"__v":0}}/>
      </div>
    )
  }
}

export default TodosContainer
```

5. Check the `/todos` page in the browser. The todo you wrote should be displayed on the page. Also, the `p` element around it should have `data-todos-index` equal to the `_id` you used -- check by inspecting the element!

 
### Tracking Todos in a List

1. To keep components organized, create a todo list component in  `src/components/TodoList.js`. Add the following code to the new component file:

```js
// src/components/TodoList.js
import React, {Component} from 'react'
import Todo from './Todo'

class TodoList extends Component {
  render(){
    let todoArray = this.props.todos.map( (todo) => {
      return (
        <Todo
          key={todo._id}
          todo={todo}/>
      )
    })
    return(
      <div className="todos">
        {todoArray}
      </div>
    )
  }
}

export default TodoList
```

2. Think critically about the code above. The `map` method iterates through an array of todos and creates `todoArray`. What is inside the `todoArray`?

<details><summary>click for an explanation</summary>The <code>todoArray</code> is an array of <code>Todo</code> components, with one component for each todo object in <code>thsi.props.todos</code>.  
</details>


<!-- In this component, we have a property called todos. When we eventually use this component, we need to pass it that property. Once we have our todos, it takes each one and maps a `Todo` component to the variable `todos`. Then renders all of the todos. We can use the map function to render multiple components for each individual todo and store them in a variable. We just need to make sure we bind `this` in case we need to access properties from the `Todos` component later. -->


6. Remove the test todo and the `import Todo` line from the `TodoContainer` component.  You can also remove the test `TodoModel.all` call if you'd like.

### Render a `TodoList`

1. The `TodosContainer` will contain a whole `TodoList`, not just a single `Todo`. Modify the `render` method in `TodosContainer` to render a test `TodoList`, and remove the test `Todo` component.

```js
// src/containers/TodosContainer.js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import TodoList from '../components/TodoList'

class TodosContainer extends Component {
  render(){
    // check that TodoModel AJAX call gets todo data
    TodoModel.all().then( (res) => {
      console.log(res);
    })
    return (
      <div className='todosContainer'>
        <h2>This is the todos container</h2>
        <TodoList
          todos={
            [
              {"_id":"58e3c74c93075e0011489f02","body":"Wash the dishes","priority":4,"completed":false,"__v":0},
              {"_id":"58e3c74c93075e0011489f07","body":"Update resume with new skills","priority":2,"completed":false,"__v":0},
              {"_id":"58e3c74c93075e0011489f05","body":"Buy nutritious groceries for the week","priority":2,"completed":false,"__v":0}
            ]
          } />
      </div>
    )
  }
}

export default TodosContainer

```

2. Think critically about the code above. Todo data won't be hard-coded in our JavaScript.  Where will todo data actually come from?

### Using Super-Crud Todo Data

In this series of steps, you'll add the remainder of the code necessary to display todos from the super-crud API.  After adding the code, you'll examine each piece. 

1. Remove the `TodoModel.all` call from the `TodosContainer` component's `render` function.

2. Update `src/containers/TodosContainer.js` with the following code:

```js
// src/containers/TodosContainer.js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import TodoList from '../components/TodoList'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.data.todos
      })
    })
  }
  render(){
    return (
      <div className='todosContainer'>
        <h2>This is the todos container</h2>
        <TodoList
          todos={this.state.todos} />
      </div>
    )
  }
}

export default TodosContainer
```

3. Check the `/todos` route in the browser. The todos from the super-crud JSON data should be rendered on the page. At this point, you can remove the `<h2>This is the todos container</h2>` element from the `TodosContainer` component. 

4. Examine the following code snippet:

```js
constructor(){
  super()
  this.state = {
    todos: []
  }
}
```

The `constructor()` for a JavaScript class is a function that is called whenever an instance of the class is created. This constructor function will be called whenever a new `TodosContainer` component is created.

The call to `super()` means this class will run the `constructor` function React defines for the `Component` class (you can tell `super` is the `Component` class because the todos container class `extends` `Component`. 

The final piece of code sets `this.state` to be an empty array. 

* What will `this.state` be when a `TodosContainer` component is first created?

<details><summary>click for answer</summary> <code>[]</code></details>

* How can the component's state be changed later?

<details><summary>click for answer</summary>The state can be set at any other time using <code>this.setState()</code></details>

5.  Examine the following code snippet:

```js
fetchData(){
  TodoModel.all().then( (res) => {
    console.log('TodoModel.all response:', res)
    this.setState ({
      todos: res.data.todos
    })
  })
}
```

6. Explain the `fetchData` function's role in your own words. 

<details><summary>click for an idea</summary>This function uses <code>TodoModel</code> to retrieve todos from the super-crud API. After that request completes, `then` the function changes the state of the container component. The new state has the value of `todos` be part of the data from the AJAX response.</details>

> Note: Any time `setState` is invoked, the component re-renders.

7.  Examine the following code snippet:

```js
componentDidMount(){
  this.fetchData()
}
```


Every component in React undergoes a component lifecycle. There are several "hooks" throughout this lifecycle, and `componentDidMount` is a built-in hook that happens after a component renders. 

> There are many hooks. A [great blog post](http://busypeoples.github.io/post/react-component-lifecycle/) goes into detail on the lifecycle of a component.


8. Think critically about the last code snippet above. Why send a `GET` request after the TodoContainer component (and components inside it) have already been rendered?  For ideas, look for the `componentDidMount` section in [React's Component documentation](https://facebook.github.io/react/docs/react-component.html).

<details><summary>click for related resources</summary> 
[Other devs have wondered about this too](http://stackoverflow.com/questions/39338464/reactjs-why-is-the-convention-to-fetch-data-on-componentdidmount). AJAX calls are asynchronous, and we'll always need to re-render after an AJAX call completes. Here's the [Facebook recommendation](https://facebook.github.io/react/docs/react-component.html#componentdidmount) saying to make initial AJAX calls inside `componentDidMount`.</details>

### Sending State Updates from Parents to Children

The state of the `TodosContainer` is simple. It has an array of `todos`. 

1. Examine your app's components critically. Briefly consider the following questions:

* How does the `TodoList` component know what data to render?   
* How does each individual `Todo` component know about the individual todo data it needs to render?   

2. Take a look at the `props` being passed from one component to the next, and trace the flow of how information is passed from larger components to the smaller components they contain, through `props`.

In `src/containers/TodosContainer.js`:


```javascript  
<TodoList
  todos={this.state.todos} />
```

In `src/components/TodoList.js`:  

```js
  let todoArray = this.props.todos.map( (todo) => {
  return (
    <Todo
      key={todo._id}
      todo={todo}
    />
  )
})
```

In `src/components/Todo.js`:

```js
<p data-todos-index={this.props.todo._id}>
  <span>{this.props.todo.body}</span>
</p>
```

It is a pattern in React to send parts of a parent component's `state` into its child component(s) as `props`.


### Pause and Reflect

Most of the API's developers have access to are read-only. At this point, you know how to use React to display that data!
