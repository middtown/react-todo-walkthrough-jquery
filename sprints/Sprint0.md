## Sprint 0: Getting Started

Create the React app. 

```bash
$ npm install -g create-react-app
$ create-react-app my-react-todo
$ cd my-react-todo
$ npm run start
```

Navigate to [`localhost:3000`](http://localhost:3000) to see the boilerplate `create-react-app` React application.

### Step 1: Hello World

1. Remove files you won't need for this demo app. Specifically, remove the following files from the `src` folder:

```bash
$ rm src/App.css
$ rm src/App.test.js
$ rm src/logo.svg
```

> You could also remove the favicon; just make sure you remove the reference to it from `index.html` as well.

> At this point, there are probably errors in the browser letting you know some of those files are still used. The next step will help resolve those errors.

2. Modify the code inside the `return` block from `src/App.js` so that it returns JSX for a header with the text Hello World. 

Also, remove the lines that reference for `'./App.css'` and `'src/logo.svg'`.  The whole file should look like this:

```jsx
// src/App.js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
```

3. Switch over to your browser to automatically see the updates.

> The `create-react-app` command installs and sets up a lot of useful tools.  A tool called `webpack` manages automatic re-rendering files change!  
