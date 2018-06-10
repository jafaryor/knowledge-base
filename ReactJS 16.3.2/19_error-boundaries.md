## Error Boundaries
A JavaScript error in a part of the UI shouldn’t break the whole app. To solve this problem for React users, React 16 introduces a new concept of an __error boundary__.

__Error boundaries__ are React components that __catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI__ instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

A class component becomes an error boundary if it defines a new lifecycle method called `componentDidCatch(error, info)`:
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
Then you can use it as a regular component:
```jsx
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

> __error boundaries only catch errors in the components below them in the tree__.

> __An error boundary can’t catch an error within itself.__

If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it. This, too, is similar to how `catch {}` block works in JavaScript.

`componentDidCatch(error, info)` arguments:
* `error` - an error that has been thrown.
* `info` - an object with `componentStack` key. The property has information about component stack during thrown error.

> As of React 16, __errors that were not caught by any error boundary will result in unmounting of the whole React component tree.__

Error boundaries do __not__ catch errors for:
* Event handlers

    If you need to catch an error inside event handler, use the regular `try/catch` statement.

* Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks)
* Server side rendering
* Errors thrown in the error boundary itself (rather than its children)
