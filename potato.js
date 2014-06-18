/* jshint node:true, mocha: true, camelcase: true, indent:4, quotmark: single */

var cheerio = require('cheerio');

/**
 * @constructor
 */
function Potato() {
  this.components = [];
  this.shadow = '<shadow></shadow>';
	return this;
}

/**
 * Register a component
 * @param {string} name, identifier for component
 * @param {string} html for component
 * @returns void
 */
Potato.prototype.add = function(name, html) {
  this.components.push({ name: name, html: html });
};

/**
 * List components
 * @param {string} name to specifiy one
 * @returns {string|array} components
 */
Potato.prototype.list = function(name) {
  var components = this.components;
  
  if(typeof name === 'undefined'){
    return components;
  }

  var componentsLength = components.length,
      foundComponents = [];

  for(var i = 0; i < componentsLength; i++){
    if(components[i].name === name){
      return components[i].html;
    }
  }
  
  return false;
};

/**
 * Render a string
 * @param {string} html to parse
 * @returns {string} parsed string
 */
Potato.prototype.render = function(html) {
  var self = this;
  var $ = cheerio.load(html);
  var components = this.list();
  var selectors = components
                    .map(function(x){ return x.name; })
                    .join();
  $(selectors).each(function(){
    var name = this.name;
    var light = $(this).html();    
    var component = self.list(name);
    var output = component.replace(self.shadow,light);
    $(this).replaceWith(output);
  });
  console.log($.html());
  return $.html();
};

module.exports = Potato;