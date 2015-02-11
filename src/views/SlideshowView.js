/*** SlideshowView ***/

define(function(require, exports, module) {

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox = require('famous/views/Lightbox')
    var Easing = require('famous/transitions/Easing')

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
      lightboxOpts: {
        inTransform: Transform.rotateY(0.5),
        inOpacity: 1,
        inOrigin: [0, 0],
        showOrigin: [0, 0],
        outTransform: Transform.rotateY(-Math.PI/2),
        outOpacity: 1,
        outOrigin: [0, 0],
        inTransition: { duration: 500, curve: 'linear' },
        outTransition: { duration: 700, curve: 'linear' },
        overlap: true
      }
    };

    SlideshowView.prototype.showCurrentSlide = function(){
      var slide = this.slides[this.currentIndex]
      this.lightbox.show(slide)
    }
    SlideshowView.prototype.showNextSlide = function(){
      this.currentIndex++
      // cycles slides endlessly
      if (this.currentIndex === this.slides.length) this.currentIndex = 0
      this.showCurrentSlide()
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
        slide.on('click', this.showNextSlide.bind(this))
      }

      this.showCurrentSlide()
    }

    module.exports = SlideshowView;
});
