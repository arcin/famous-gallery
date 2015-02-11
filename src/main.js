define(function(require, exports, module) {
  var Engine  = require('famous/core/Engine')
  var Utility = require('famous/utilities/Utility')
  var mainContext = Engine.createContext()

  var AppView = require('views/AppView')
  var SlideData = require('data/SlideData')

  // async call that will initialize app
  Utility.loadURL(SlideData.getUrl(), initApp)

  function initApp(urlData){
    var urls = SlideData.parse(urlData)
    var appView = new AppView({ urls: urls })

    // Mount the appView onto the mainContext
    mainContext.add(appView)
  }

});
