'use strict';

function Recipe(o){
  strip(o);

  this.name        = o.name         || 'Generic Recipe';
  this.photo       = o.photo        ||   '/img/grocery-bag.jpg';
  this.directions  = o.directions   || 'look up directions';
  this.ingredients = o.ingredients || 'Food, Water, Bacon';
  this.ingredients = this.ingredients.split(',').map(function(i){return i.trim();});
  this.created     = new Date();
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().sort({created:-1}).toArray(cb);
};

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

module.exports = Recipe;


// PRIVATE FUNCTIONS ///

function strip(o){
  // stripping leading and following spaces from all properties inside of o that are strings
  var properties = Object.keys(o);
  properties.forEach(function(property){
    if(typeof o[property] === 'string'){
      o[property] = o[property].trim();
    }
  });
}
