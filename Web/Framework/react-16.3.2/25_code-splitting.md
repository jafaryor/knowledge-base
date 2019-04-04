## Code-Splitting
If you’re using [Create React App](), [Next.js](), [Gatsby](), or a similar tool, you will have a Webpack setup out of the box to bundle your app.

Code-splitting your app can help you __lazy-load__ just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

### `import()`
When Webpack comes across this syntax, it automatically starts code-splitting your app. If you’re using Create React App, this is already configured for you and you can start using it immediately. It’s also supported out of the box in Next.js.

If you’re setting up Webpack yourself, your Webpack config should look vaguely like this:
```javascript
module.exports = {
  entry: {
    main: './src/app.js',
  },
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].bundle.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].bundle.js',
    // `path` is the folder where Webpack will place your bundles
    path: './dist',
    // `publicPath` is where Webpack will load your bundles from (optional)
    publicPath: 'dist/'
  }
};
```

### React Loadable
[React Loadable](https://github.com/thejameskyle/react-loadable) wraps dynamic imports in a nice, React-friendly API for introducing code splitting into your app at a given component.

### Route-based code splitting
Here’s an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reacttraining.com/react-router/) and [React Loadable](https://github.com/thejameskyle/react-loadable).
```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./routes/About'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Switch>
  </Router>
);
```