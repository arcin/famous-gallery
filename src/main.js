define(function(require, exports, module) {
  var Engine  = require('famous/core/Engine')
  var Utility = require('famous/utilities/Utility')
  var mainContext = Engine.createContext()

  var AppView = require('views/AppView')
  var SlideData = require('data/SlideData')

  // Used to generate 3D effect. Perspective is the pixel
  // distance from the context plane.
  mainContext.setPerspective(1000)

  // async call that will initialize app
  Utility.loadURL(SlideData.getUrl(), initApp)

  function initApp(urlData){
    var urls = SlideData.parse(urlData)
    var appView = new AppView({ urls: urls })

    // Mount the appView onto the mainContext
    mainContext.add(appView)
  }

});
