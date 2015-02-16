/*** AppView ***/

define(function(require, exports, module) {

    var View = require('famous/core/View')
    var Surface = require('famous/core/Surface')
    var Transform = require('famous/core/Transform')
    var StateModifier = require('famous/modifiers/StateModifier')
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var ContainerSurface = require('famous/surfaces/ContainerSurface')

    var SlideshowView = require('views/SlideshowView')

    function AppView() {

        View.apply(this, arguments)


        _createCamera.call(this)
        _createSlideshow.call(this)
    }

    AppView.prototype = Object.create(View.prototype)
    AppView.prototype.constructor = AppView

    AppView.DEFAULT_OPTIONS = {
      urls: undefined,
      cameraWidth: 0.6 * window.innerHeight
    }

    AppView.DEFAULT_OPTIONS.slideWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth
    AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40
    AppView.DEFAULT_OPTIONS.slidePosition = 0.33 * AppView.DEFAULT_OPTIONS.cameraWidth

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

    function _createSlideshow(){
      // Instantiate and mount slideshowView
      var slideshowView = new SlideshowView({
        size: [this.options.slideWidth, this.options.slideHeight],
        urls: this.options.urls
      })


      var slideshowModifier = new StateModifier({
        origin: [0.5, 0],
        align: [0.5, 0],
        transform: Transform.translate(
          -(this.options.slideWidth/2), this.options.slidePosition, 0
        )
      })

      var slideshowContainer = new ContainerSurface({
        properties: {
          overflow: 'hidden'
        }
      })
      this.add(slideshowModifier).add(slideshowContainer)

      slideshowContainer.add(slideshowView)
      slideshowContainer.context.setPerspective(1000)
    }

    module.exports = AppView
});
