# Potato - Component Render

## Example
```javascript
  P = new Potato();
  P.add('heading', '<h1><shadow></shadow></h1>');
  var result = P.render('<heading>Hello, World.</heading>');
  console.log(result);
  // <h1>Hello, World.</h1>
```