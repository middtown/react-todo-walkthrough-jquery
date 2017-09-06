## Sprint 1: React Router

We're going to use React Router!

Client-side routing isn't strictly necessary for this application. However, client-side routing will let our single page app (SPA) keep the url in synch with what the user is seeing and doing as the page content changes. This is useful for deep linking and search engines!  

This Todo app will have two urls or application-states (not to be confused with component states): the root url (`/`) and a url to view all todos (`/todos`).

There is a lot to learn about React Router, and we'll just be scratching the surface. 


### Creating Routes

1. Install `react-router` as a dependency with `npm install --save react-router@3.0.4`.  If you get errors on the next few steps, confirm that you have it installed by checking `package.json`.  

> Note: react is still in development, and modules like `react-router` may change. This lab's solutions use `react-router` version 3.0.0.  The v3 documentation can be found through [ReactTraining](https://github.com/ReactTraining/react-router/tree/v3/docs).

2. Make a `config` folder inside `src` and a `routes.js` file inside that. The `routes.js` file will contain the app's routes:

```bash
$ mkdir src/config
$ touch src/config/routes.js
```

3. Fill in the contents the `routes.js` file:

```jsx
// src/config/routes.js
import React from 'react'
import {Route} from 'react-router'
import App from '../App'

export default (
  <Route path='/' component={App}/>
)
```

4. The `Route` component comes from `react-router`, and the snippet above uses this `Route` component to create a route for the root path(`'/'`).  `Route` also needs to know what component should be rendered when the user navigates to that path.  Here, the component to render is the `App` component defined earlier.

> Notice that the code imports `React` from `'react'` but uses `{}` to import `{Route}` from `'react-router'`. What's the difference?

> Using `{Route}` imports *one* specific module - the `Route` module - from `react-router` - and names it `Route`.  

> Without the `{}`, the import it would have grabbed all of `react-router` functionality. Check out the [react router v3 source code](https://github.com/ReactTraining/react-router/tree/v3) to see `Route` and other modules within `react-router`.

4. The `src/config/routes.js` file sets up a route, but it's not connected to any of the app's other files yet.  Referencing the code below, update `index.js` to use React Router now instead of just rendering the `App` Component.


```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router'
import routes from './config/routes.js'

ReactDOM.render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('root')
);
```

5. Think critically about the code above. What is it doing? How can you find out about less familiar pieces like the `Router` and `browserHistory` modules?


6. If everything is connected correctly, you  should still see the hello world header showing when you visit the route you set up!



### Custom Header Component


1. The view on the `/` path will get more complex, so it makes sense to start splitting its contents into small components. Create a `components` directory and a `Header.js` file inside it.

```bash
$ mkdir src/components
$ touch src/components/Header.js
```

2. In the new header component file, add a `render` method that `return`s JSX for a more todo-appropriate header tag.

```jsx
// src/components/Header.js
import React, {Component} from 'react'
import {Link} from 'react-router'

class Header extends Component{
  render(){
    return (
      <header>
        <h1><Link to={'/todos'}>React Todos</Link></h1>
      </header>
    )
  }
}

export default Header
```

3. The `Link` component is new in this file. What do you think it will do?   

<details><summary>click here to check your guess for <code>Link</code></summary>
  <code>Link</code> creates a link to another route (similar to <code>href</code> in an HTML <code>a</code> tag).
</details>




4. Update `src/App.js` to render the `Header` component.


```js
// src/App.js
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App
```



5. Check your page again - what has changed?  Why? Once you carefully read any error messages, move on to the next step!




6. Add a line to `src/App.js` to actually import the `Header` component: 

```js
import Header from './components/Header'
```

7. Try clicking on the React Todos link. You should see a warning in the console: `Warning: [react-router] Location "/todos" did not match any routes`.  Does it make sense?  Where are your routes defined, so you can check?

8. Confirm that `config/routes.js` only has a reference to `'/'`; there's no route for `/todos` yet.  Make a note in your `config/routes.js` file to remind yourself to add that route later!

[Next!](https://github.com/den-materials/react-todo-walkthrough-jquery/blob/master/sprints/Sprint2.md)
