## Sprint 2: Containers and Nested Components

React components should be FIRST: 

- focused,  
- independent,   
- reusable,   
- small,    
- and testable.  

In order to help keep components small, a good practice is to move the business logic surrounding a component's state to a container component. This "container component" is just a larger component used for organization.

The goal of this sprint is to create a container component to manage the app's list of todos and the logic around them. This component will be what shows when the user is on the `/todos` route.  It will start out very simple like the `Header` component, but it will end up much more complex.

The `TodosContainer` component will eventually contain a list of todos and the form to create new todos. 

1. Inside `src`, create a `containers` folder and then a file for the Todo container component:

```bash
$ mkdir src/containers
$ touch src/containers/TodosContainer.js
```

2. In the new container component file, create a simple component:

```js
// src/containers/TodosContainer.js
import React, {Component} from 'react'

class TodosContainer extends Component {
  render(){
    return (
      <div className='todos-container'>
        <h2>This is the todos container</h2>
      </div>
    )
  }
}

export default TodosContainer
```

3. Add a `Route` to use the `TodosContainer` component when the user is at the `/todos` url.

```js
// which file does this belong in?
import TodosContainer from '../containers/TodosContainer'

export default (
  <Route path='/' component={App}>
    <Route path='/todos' component={TodosContainer}/>
  </Route>
)
```

4. Go back to the home page, and click on the link. The warning or error from before should be gone now, since the `/todos` route is defined.  However, the content from `TodosContainer` doesn't show on the page yet!

5. In `src/App.js`, add this line to tell the `App` component what to render when it has this nested relationship through routes:

```js
render() {
  return (
    <div className="App">
      <Header />
      {this.props.children}
    </div>
  );
}
```


6. Think critically about the code snippet above.  What is `this.props.children`? How is it related to the structure of `Route`s in  `src/config/routes.js`?


> Note that the `Route` for `/todos` is nested within the `Route` for `'/'`.  That's why `this.props.children` for the `App` component will include the TodosContainer from the `/todos` route.

7. Check the page in the browser again. 

### Style Break!

At this point, you've practiced most of what you need to know about using React for client-side routing when you are NOT using a back end.

1. Take a style break. Add some CSS in `index.css`. Here are some basic styles you can use if you want:

```css
body {
  margin: 0;
  padding: 0;
  font-family: "Brush Script MT", cursive;
}

header, .todos {
  text-align: center
}

.todosContainer {
  width: 60%;
  margin: auto;
}

h2 {
  padding-bottom: .5em;
  margin-bottom: .5em;
}

.incomplete h2{
  border-bottom: 3px solid red;
}

h1, h2{
  font-family: "Brush Script MT", cursive;
}

p {
  font-family: "Brush Script MT", cursive;
  font-size: 2em;
}

.todoForm {
  clear:both;
  text-align: center;
}

span.deleteButton, span.toggleButton {
  padding-left: 1em;
}

.deleteButton{
  color: red;
}

.createForm {
  padding-top: 3em;
  padding-bottom: 3em;
  margin: auto;
  width: 58%;
}

```
> Note that you'll have to `import` these styles into your `index.js` file for your styles to show up.

[Next!](https://github.com/den-materials/react-todo-walkthrough-jquery/blob/master/sprints/Sprint3.md)
