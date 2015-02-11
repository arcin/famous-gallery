/*** AppView ***/

define(function(require, exports, module) {

    var View = require('famous/core/View')
    var Surface = require('famous/core/Surface')
    var Transform = require('famous/core/Transform')
    var StateModifier = require('famous/modifiers/StateModifier')
    var ImageSurface = require('famous/surfaces/ImageSurface')

    var SlideshowView = require('views/SlideshowView')

    function AppView() {

        View.apply(this, arguments)

        // Instantiate and mount slideshowView
        var slideshowView = new SlideshowView({
          urls: this.options.urls
        })

        this.add(slideshowView)

        _createCamera.call(this)
    }

    AppView.prototype = Object.create(View.prototype)
    AppView.prototype.constructor = AppView

    AppView.DEFAULT_OPTIONS = {
      urls: undefined,
      cameraWidth: 0.6 * window.innerHeight
    }

    function _createCamera(){
      var camera = new ImageSurface({
        size: [this.options.cameraWidth, true],
        content: 'img/camera.png',
        properties: {
          width: '100%'
        }
      })

      var cameraModifier = new StateModifier({
        origin: [0.5, 0],
        align: [0.5, 0],
        transform: Transform.behind
      })

      this.add(cameraModifier).add(camera)
    }

    module.exports = AppView
});
