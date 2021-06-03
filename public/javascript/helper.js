var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

Handlebars.registerHelper("ifcon", function(value1,value2, options){
    if(value1 == value2) {
        return options.fn(this);
    }else{
      return options.inverse(this);
    }
});