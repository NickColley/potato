/* jshint node:true, mocha: true, camelcase: true, indent:4, quotmark: single */

var Potato = require('./potato.js');
var assert = require('assert');
var P;

describe('Potato', function(){
  
  beforeEach(function(){
    P = new Potato();
  });
  
  describe('add', function(){
    it('should register component', function(){  
      P.add('heading', '<h1><shadow></shadow></h1>');
      assert.equal(P.components[0].html, '<h1><shadow></shadow></h1>');
    });
  });
  
  describe('list', function(){
    it('should return all components', function(){
      P.add('heading', '<h1><shadow></shadow></h1>');
      P.add('sub-heading', '<h3><shadow></shadow></h3>');
      var expected = [{
                     name: 'heading',
                     html: '<h1><shadow></shadow></h1>'
                   },
                   {
                     name: 'sub-heading',
                     html: '<h3><shadow></shadow></h3>'
                   }];
      assert.deepEqual(P.list(), expected);
    });
    it('should return specific components', function(){
      P.add('heading', '<h1><shadow></shadow></h1>');
      P.add('sub-heading', '<h3><shadow></shadow></h3>');
      var expected1 = '<h1><shadow></shadow></h1>';
      var expected2 = '<h3><shadow></shadow></h3>';
      assert.deepEqual(P.list('heading'), expected1);
      assert.deepEqual(P.list('sub-heading'), expected2);
    });
  });

  describe('render', function(){
    it('should render component', function(){
      P.add('heading', '<h1><shadow></shadow></h1>');
      var expected = '<h1>Hello!</h1>';
      var result = P.render('<heading>Hello!</heading>');
      assert.deepEqual(result, expected);
    });
    it('should render multiple components', function(){
      var input = '';
      input += '<heading>';
      input += '  Hello!';
      input += '</heading>';
      input += '<sub-heading>';
      input += '  World.';
      input += '</sub-heading>';
      
      P.add('heading', '<h1><shadow></shadow></h1>');
      P.add('sub-heading', '<h3><shadow></shadow></h3>');     
      
      var expected = '';
      expected += '<h1>';
      expected += '  Hello!';
      expected += '</h1>';
      expected += '<h3>';
      expected += '  World.';
      expected += '</h3>';     
      
      var result = P.render(input);
      assert.deepEqual(result, expected);
    });
    it('should render nested components', function(){
      var input = '';
      input += '<panel>';
      input += '  <title>';
      input += '    Hello!';
      input += '  </title>';
      input += '</panel>';
      
      P.add('panel', '<center><shadow></shadow></center>');
      P.add('title', '<h1><shadow></shadow></h1>');     
      
      var expected = '';
      expected += '<center>';
      expected += '  <h1>';
      expected += '    Hello!';
      expected += '  </h1>';
      expected += '</center>';   
      
      var result = P.render(input);
      assert.deepEqual(result, expected);
    });
    it('should render components inside components', function(){
      var input = '<datetime>12:30</datetime>';
      
      P.add('datetime', '<center><title>The time is:</title><shadow></shadow></center>');
      P.add('title', '<h1><shadow></shadow></h1>');     
      
      var expected = '<center><h1>The time is:</h1>12:30</center>';
      
      var result = P.render(input);
      assert.deepEqual(result, expected);
    });
  });
  
  describe('README examples', function(){
    it('Hello, World.', function(){      
      P = new Potato();
      P.add('heading', '<h1><shadow></shadow></h1>');
      var result = P.render('<heading>Hello, World.</heading>');
      assert.equal(result, '<h1>Hello, World.</h1>');
    });
  });
  
});