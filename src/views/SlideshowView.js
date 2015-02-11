/*** SlideshowView ***/

define(function(require, exports, module) {

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox = require('famous/views/Lightbox')
    var SlideView = require('views/SlideView')

    function SlideshowView() {
      View.apply(this, arguments);

      this.rootModifier = new StateModifier({
        size: this.options.size,
        origin: [0.5, 0],
        align: [0.5, 0]
      })

      this.mainNode = this.add(this.rootModifier)

      _createLightbox.call(this)
      _createSlides.call(this)
    }

    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    SlideshowView.DEFAULT_OPTIONS = {
      size: [450, 500],
      urls: undefined,
      lightboxOpts: {}
    };

    SlideshowView.prototype.showCurrentSlide = function(){
      var slide = this.slides[this.currentIndex]
      this.lightbox.show(slide)
    }

    function _createLightbox(){
      this.lightbox = new Lightbox(this.options.lightboxOpts)
      this.mainNode.add(this.lightbox)
    }

    function _createSlides(){
      this.slides = []
      // store current index of slideshow during slides creation
      this.currentIndex = 0

      for (var i = 0; i < this.options.urls.length; i++) {
        var slide = new SlideView({
          size: this.options.size,
          photoUrl: this.options.urls[i]
        })

        this.slides.push(slide)
      }

      this.showCurrentSlide()
    }

    module.exports = SlideshowView;
});
