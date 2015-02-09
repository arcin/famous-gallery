define(function(require, exports, module) {
  var Engine  = require('famous/core/Engine')
  var AppView = require('views/AppView')

  var mainContext = Engine.createContext()

  // Instantiate appview
  var appView = new AppView()

  // Mount the appView onto the mainContext
  mainContext.add(appView)
});
